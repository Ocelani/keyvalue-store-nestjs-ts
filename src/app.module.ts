import { Module } from '@nestjs/common';

import { KeyValueModule } from './keyvalue/keyvalue.module';

@Module({
  imports: [KeyValueModule],
})
export class AppModule {}
