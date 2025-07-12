import { Controller, Get } from '@nestjs/common';
import { BlobService } from './blob.service';

@Controller('blob')
export class BlobController {
  constructor(private readonly blobService: BlobService) {}

}
