import { Body, Controller, Post } from '@nestjs/common';
import { SubmitFromService } from './submitfrom.service';
import { CreateSubmitFromDto } from './dto/create-submitfrom.dto';

@Controller('submitfrom')
export class SubmitFromController {
  constructor(private readonly submitFromService: SubmitFromService) {}

  @Post()
  async submitForm(@Body() createDto: CreateSubmitFromDto) {
    return this.submitFromService.create(createDto);
  }
}
