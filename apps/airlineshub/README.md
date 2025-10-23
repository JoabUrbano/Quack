# ✈️ AirlinesHub Microservice

Microserviço responsável pelo gerenciamento de companhias aéreas na plataforma Quack.

## Desenvolvimento

```bash
# Instalar dependências
yarn install

# Iniciar em modo desenvolvimento (com hot-reload)
yarn start:dev

# Iniciar em modo produção
yarn start:prod

# Build para produção
yarn build
```

## Testes

```bash
# Executar testes unitários
yarn test

# Executar testes em modo watch
yarn test:watch

# Executar testes com cobertura
yarn test:cov

# Executar testes e2e
yarn test:e2e
```

## Banco de Dados

### Executar migrations
```bash
yarn prisma migrate dev --name <migration_name>
```

### Gerar Prisma Client
```bash
yarn prisma generate
```

### Abrir Prisma Studio
```bash
yarn prisma studio
```

## Variáveis de Ambiente

```
DATABASE_URL=postgresql://quack:quack@localhost:5432/airlineshub?schema=public
PORT=3001
NODE_ENV=development
```

## Estrutura de Pastas

```
apps/airlineshub/
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts         # Entrypoint da aplicação
├── test/
│   └── app.e2e-spec.ts
├── package.json
└── tsconfig.json
```

## Padrões

- Usar DTOs para validação de entrada
- Separar lógica em Services
- Usar Guards para autenticação
- Documentar APIs com OpenAPI/Swagger

## Próximos Passos

- [ ] Criar schemas Prisma
- [ ] Implementar módulos de negócio
- [ ] Adicionar testes unitários
- [ ] Integrar com API Gateway
- [ ] Implementar logging centralizado
