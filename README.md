# KeyValueStore com gRPC

Feito com nestjs: https://docs.nestjs.com/microservices/basics#client

Começamos fazendo no Go, uma linguagem que não dominávamos, mas devido a erros de compilação que não conseguimos contornar, mudamos para o typescript - nestjs, que possui uma interface fácil e interessante para mexer com o gRPC.

### Project

Desenvolver um Key-Value store in memory utilizando o gRPC.

As primitivas do Key-Value Store são:

    put(key, value)
    get(key) : value
    getAllKeys() : Key[]

Neste trabalho, vocês deverão utilizar o protocolo gRPC para permitir que o cliente adicione uma chave e valor. Neste trabalho não será necessário implementar buckets de dados para cada cliente. Ou seja, todos os clientes poderão acessar uma base de dados comum.

O trabalho poderá ser realizado com qualquer linguagem/plataforma suportada pelo gRPC.

O trabalho deve ser desenvolvido no Github Classroom: https://classroom.github.com/g/kGwmPqt3 (Links para um site externo.)

O uso adequado da ferramenta de gerência de configuração será considerado na avaliação do trabalho.

Escreva um ou dois parágrafo resumindo o objetivo do seu projeto.

## Alunos integrantes da equipe

- Douglas Scalioni Domingues
- Otavio Celani

## Professores responsáveis

- Hugo de Paula

## Instruções de utilização

#### Pré-requisitos: 

- Node.js (ou container com node)

#### Passo-a-passo:

1. npm install;

2. npm run start:dev (roda cliente e servidor)
    
no momento que o programa começa a rodar, são exibidas todas a rotas do console:
    
    [23:27:34] Starting compilation in watch mode...
    [23:27:36] Found 0 errors. Watching for file changes.
    [Nest] 82568   - 13/09/2020 23:27:37   [NestFactory] Starting Nest application...
    [Nest] 82568   - 13/09/2020 23:27:37   [InstanceLoader] AppModule dependencies initialized +12ms
    [Nest] 82568   - 13/09/2020 23:27:37   [InstanceLoader] ClientsModule dependencies initialized +0ms
    [Nest] 82568   - 13/09/2020 23:27:37   [InstanceLoader] KeyValueModule dependencies initialized +1ms
    [Nest] 84426   - 13/09/2020 23:35:13   [NestMicroservice] Nest microservice successfully started +4ms
    Method handler createOne for /keyvalue.KeyValueService/createOne expected but not provided
    [Nest] 84426   - 13/09/2020 23:35:13   [RoutesResolver] KeyValueController {/keyvalue}: +10ms
    [Nest] 84426   - 13/09/2020 23:35:13   [RouterExplorer] Mapped {/keyvalue, GET} route +1ms
    [Nest] 84426   - 13/09/2020 23:35:13   [RouterExplorer] Mapped {/keyvalue/:id, GET} route +1ms
    [Nest] 84426   - 13/09/2020 23:35:13   [RouterExplorer] Mapped {/keyvalue, POST} route +0ms
    [Nest] 84426   - 13/09/2020 23:35:13   [NestApplication] Nest application successfully started +4ms
    Application is running on: http://[::1]:3001  
    
3. Comandos

inserir item como json:

    {
        "name": "name",
        "value": "value"
    }

buscar item na chave 1:
    
    http://localhost:3001/keyvalue/1

get all keys:

    http://localhost:3001/keyvalue

