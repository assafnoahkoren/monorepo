import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/sheets')
  postSheets(@Body() body: any, @Query() query: Request): any {
    return {
      query: query,
      body: body,
      results: [
        {
          residence: 'Hotel 1',
          group: 'Group 1',
          rooms: 10,
        },
        {
          residence: 'Hotel 2',
          group: 'Group 1',
          rooms: 10,
        },
        {
          residence: 'Hotel 3',
          group: 'Group 2',
          rooms: 10,
        },
        {
          residence: 'Hotel 4',
          group: 'Group 3',
          rooms: 10,
        },
      ],
    };
  }
}
