import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Param,
    ParseIntPipe,
    Patch,
    ValidationPipe,
    UsePipes,
  } from '@nestjs/common';
import { JobAnnouncement } from 'src/entities/job/jobAnnouncement.entity';
import { createAnnouncement } from './jobDto/create-announcement.dto';
import { updateAnnouncement } from './jobDto/update-announcement.dto';
import { JobService } from './job.service';
import { searchAnnouncement } from './jobDto/search-announcement.dto';

@Controller('job')
export class JobController {
    constructor(private readonly service: JobService) {}

    @Get('index')
    indexGet(): Promise<JobAnnouncement[]> {
      return this.service.index();
    }

    @Get('search')
    @UsePipes(new ValidationPipe({whitelist:true}))
    searchGet(@Body() dto: searchAnnouncement): Promise<JobAnnouncement[]> {
      return this.service.search(dto);
    }

    @Get('index/:id')
    findById(@Param('id', new ParseIntPipe()) id: number): Promise<JobAnnouncement> {
      return this.service.findById(id);
    }

    @Get('title/:title')
    findByTitle(@Param() title: string): Promise<JobAnnouncement[]> {
      return this.service.findByTitle(title);
    }

    @Get('tag/:tag')
    findByTag(@Param() tag: string): Promise<JobAnnouncement[]> {
      return this.service.findByTag(tag);
    }

    @Get('company/:company')
    findByCompany(@Param() company: string): Promise<JobAnnouncement[]> {
      return this.service.findByCompany(company);
    }
  
    @Post()
    @UsePipes(new ValidationPipe({whitelist:true}))
    create(@Body() dto: createAnnouncement): Promise<JobAnnouncement> {
      return this.service.createAnnouncement(dto);
    }
  
    @Patch(':id')
    @UsePipes(new ValidationPipe({whitelist:true}))
    update( @Param('id', new ParseIntPipe()) id: number, @Body() dto: updateAnnouncement): Promise<JobAnnouncement> {
      for (const [key, value] of Object.entries(dto)) {
        if (value == null) {
            delete dto[key];
        }
      }
      return this.service.update(id, dto);
    }
  
    @Delete(':id')
    delete(@Param('id', new ParseIntPipe()) id: number): Promise<JobAnnouncement> {
      return this.service.delete(id);
    }
}