import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { grpcClientOptions } from '../grpc-client.options';
import { KeyValueController } from './keyvalue.controller';



@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KeyValue_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [KeyValueController],
})
export class KeyValueModule {}
