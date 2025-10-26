#!/bin/bash
set -e

echo "Iniciando serviço imdtravel..."

# Navegar para o diretório da aplicação
cd /app/apps/imdtravel

# Executar prisma migrate dev
echo "Executando migrações do Prisma..."
# npx prisma migrate dev
npx prisma migrate deploy 

npx prisma generate

# Voltar para o diretório raiz
cd /app

# Iniciar a aplicação
echo "Iniciando aplicação..."
exec yarn start:dev imdtravel
