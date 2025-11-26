import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  @ApiOperation({ summary: 'Check service health' })
  @ApiOkResponse({ description: 'Service is healthy' })
  @Get('health')
  health() {
    return {
      status: 'ok',
      service: 'auth',
    };
  }
}
