import { Controller, Get } from '@nestjs/common';
import { BlobService } from './blob.service';

@Controller('blob')
export class BlobController {
  constructor(private readonly blobService: BlobService) {}

  @Get('health')
  async health() {
    let bucketResult: any;
    try {
      bucketResult = await this.blobService.createCourseBucket('test', 'test1', new Date());
    } catch (e) {
      bucketResult = { error: e.message };
    }
    return {
      ok: true,
      bucketResult,
    };
  }
}
