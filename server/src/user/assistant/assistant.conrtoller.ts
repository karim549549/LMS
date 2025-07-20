import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AssistantService } from './assistant.services';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterAssistantDto } from './dtos/ReigsterAssistantDto';

@Controller('assistant')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  async registerAssistant(
    @Body() body: RegisterAssistantDto,
    @UploadedFile() avatar?: Express.Multer.File
  ) {
    return await this.assistantService.registerAssistant({ ...body, avatar });
  }
}
