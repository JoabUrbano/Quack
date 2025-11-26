#!/bin/bash
set -e

echo "Iniciando serviço auth..."

# Navegar para o diretório da aplicação
cd /app/apps/auth

# Gerar cliente Prisma primeiro
echo "Gerando cliente Prisma..."
npx prisma generate

# Executar migrações
echo "Executando migrações do Prisma..."
npx prisma migrate deploy

# Voltar para o diretório raiz
cd /app

# Iniciar a aplicação
echo "Iniciando aplicação..."
exec yarn start:dev auth
