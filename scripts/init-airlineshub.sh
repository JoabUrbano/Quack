#!/bin/bash
set -e

echo "Iniciando serviço airlineshub..."

# Navegar para o diretório da aplicação
cd /app/apps/airlineshub

# Executar prisma migrate dev
echo "Executando migrações do Prisma..."
# npx prisma migrate dev
npx prisma migrate deploy 

npx prisma generate

# Voltar para o diretório raiz
cd /app

# Iniciar a aplicação
echo "Iniciando aplicação..."
exec yarn start:dev airlineshub
