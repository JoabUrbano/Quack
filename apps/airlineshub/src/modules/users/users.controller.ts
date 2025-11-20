import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserUseCase } from '@airlineshub/modules/users/usecases/createUser.usecase';
import { FindManyUsersDto } from '@airlineshub/modules/users/dtos/findManyUsers.dto';
import { FindManyUsersUseCase } from '@airlineshub/modules/users/usecases/findManyUsers.usecase';
import { FindOneUserByIdUseCase } from '@airlineshub/modules/users/usecases/findOneUserById.usecase';
import { DeleteOneUserUseCase } from '@airlineshub/modules/users/usecases/deleteOneUser.usecase';
import { UpdateOneUserUseCase } from '@airlineshub/modules/users/usecases/updateOneUser.usecase';
import { UpdateOneUserDto } from '@airlineshub/modules/users/dtos/updateOneUser.dto';
import { UserCreatedEventDto } from '@app/shared/events';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findManyUsersUseCase: FindManyUsersUseCase,
    private readonly findOneUserByIdUseCase: FindOneUserByIdUseCase,
    private readonly deleteOneUserUseCase: DeleteOneUserUseCase,
    private readonly updateOneUserUseCase: UpdateOneUserUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @Post()
  createUser(@Body() createUserDto: UserCreatedEventDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users returned' })
  @Get()
  findAllUsers(@Query() findManyUsersDto: FindManyUsersDto) {
    return this.findManyUsersUseCase.execute(findManyUsersDto);
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  findOneUserById(@Param('id') id: string) {
    return this.findOneUserByIdUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.deleteOneUserUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateOneUserDto: UpdateOneUserDto,
  ) {
    return this.updateOneUserUseCase.execute(id, updateOneUserDto);
  }
}
