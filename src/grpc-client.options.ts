import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: "keyvalue", // ['keyValue', 'keyValue2']
    protoPath: join(__dirname, "./keyValue/keyvalue.proto"), // ['./keyValue/keyValue.proto', './keyValue/keyValue2.proto']
  },
};
