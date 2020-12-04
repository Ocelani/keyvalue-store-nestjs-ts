import { Controller, Get, Inject, OnModuleInit, Param, Post } from '@nestjs/common';
import { ClientGrpc, GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { readFileSync, writeFile } from 'fs';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';

import { CreateKeyValue } from './interfaces/createKeyValue.interface';
import { KeyValue } from './interfaces/KeyValue.interface';
import { KeyValueById } from './interfaces/KeyValueById.interface';

const keystore = readFileSync("./keystore.json");

interface KeyValueService {
  findOne(data: KeyValueById): Observable<KeyValue>;
  findMany(upstream: Observable<KeyValueById>): Observable<KeyValue>;
  createOne(data: CreateKeyValue): Observable<KeyValue>;
}
@Controller("keyvalue")
export class KeyValueController implements OnModuleInit {
  private KeyValueService: KeyValueService;
  private keyValue: KeyValue;
  private keys: KeyValue[] = [
    { id: 1, name: "a", value: "1" },
    { id: 2, name: "b", value: "2" },
  ];

  constructor(@Inject("KeyValue_PACKAGE") private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.KeyValueService = this.client.getService<KeyValueService>("KeyValueService");
  }

  @Get()
  getMany(): Observable<KeyValue[]> {
    const ids$ = new ReplaySubject<KeyValueById>();

    this.keys.forEach((keyValue) => {
      ids$.next({ id: keyValue.id });
    });
    ids$.complete();

    const stream = this.KeyValueService.findMany(ids$.asObservable());
    return stream.pipe(toArray());
  }

  @Get(":id")
  getKeyValueById(@Param("id") id: string): Observable<KeyValue> {
    return this.KeyValueService.findOne({ id: +id });
  }

  @Post()
  postKeyValue(@Param() dto: CreateKeyValue): Observable<KeyValue> {
    return this.KeyValueService.createOne({ name: dto.name, value: dto.value });
  }

  @GrpcMethod("KeyValueService")
  findOne(data: KeyValueById): KeyValue {
    return this.keys.find(({ id }) => id === data.id);
  }

  @GrpcStreamMethod("KeyValueService")
  findMany(data$: Observable<KeyValueById>): Observable<KeyValue> {
    const KeyValue$ = new Subject<KeyValue>();

    const onNext = (KeyValueById: KeyValueById) => {
      const item = this.keys.find(({ id }) => id === KeyValueById.id);
      KeyValue$.next(item);
    };
    const onComplete = () => KeyValue$.complete();
    data$.subscribe(onNext, null, onComplete);

    return KeyValue$.asObservable();
  }

  @GrpcMethod("KeyValueService")
  createOne(data: CreateKeyValue): KeyValue {
    const name = data.name;
    const value = data.value;
    const id = this.keys.length + 1;

    const key = {
      id: id,
      name: name,
      value: value,
    };
    writeFile(keystore, key, (err) => {
      if (err) throw err;
      console.log("Data written to file.");
    });

    return key;
  }
}
