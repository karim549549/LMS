import { Global, Module } from '@nestjs/common';
import { BlobController } from './blob.controller';
import { BlobService } from './blob.service';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

const supabaseProvider = {
  provide: 'SUPABASE_CLIENT',
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const url = config.get<string>('SUPABASE_URL');
    const key = config.get<string>('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !key) throw new Error('Supabase config missing');
    return createClient(url, key);
  },
};

@Global()
@Module({
  controllers: [BlobController],
  providers: [BlobService, supabaseProvider],
  exports: [BlobService],
})
export class BlobModule {}
