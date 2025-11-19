import {
    Injectable,
    BadRequestException,
    ConflictException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@auth/prisma.service';
import { BcryptService } from '@auth/auth/services/bcrypt.service';
import { JwtService } from '@auth/auth/services/jwt.service';
import { TokenService } from '@auth/auth/services/token.service';
import { RegisterDTO, LoginDTO } from '@auth/auth/dtos';


export interface AuthResponse {
    id: string;
    email: string;
    accessToken: string;
    refreshToken: string;
}

export interface RegisterResponse {
    id: string;
    email: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService,
        private readonly tokenService: TokenService,
    ) { }

    async register(registerDTO: RegisterDTO): Promise<RegisterResponse> {
        const { email, password } = registerDTO;

        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        const hashedPassword = await this.bcryptService.hash(password);

        const user = await this.prismaService.user.create({
            data: {
                email,
                password: hashedPassword,
                name: registerDTO.name,
            },
        });

        return {
            id: user.id,
            email: user.email,
        };
    }

    async login(loginDTO: LoginDTO): Promise<AuthResponse> {
        const { email, password } = loginDTO;

        const user = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await this.bcryptService.compare(
            password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = this.jwtService.generateAccessToken({
            sub: user.id,
            email: user.email,
        });

        const refreshToken = this.jwtService.generateRefreshToken({
            sub: user.id,
            email: user.email,
        });

        await this.tokenService.revokeAllUserTokens(user.id);
        await this.tokenService.storeRefreshToken(user.id, refreshToken);

        return {
            id: user.id,
            email: user.email,
            accessToken,
            refreshToken,
        };
    }

    async logout(userId: string): Promise<void> {
        await this.tokenService.revokeAllUserTokens(userId);
    }

    async refreshAccessToken(
        refreshToken: string,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        return this.tokenService.refreshAccessToken(refreshToken);
    }

    async validateToken(token: string): Promise<{ sub: string; email: string }> {
        try {
            return this.jwtService.verifyAccessToken(token);
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
