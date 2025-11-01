#!/bin/bash
set -e

echo "Iniciando serviço fidelity..."

# Navegar para o diretório da aplicação
cd /app/apps/fidelity

# Executar prisma migrate dev
echo "Executando migrações do Prisma..."
# npx prisma migrate dev
npx prisma migrate deploy 

npx prisma generate

# Executar seed
# echo "Alimentando banco de dados com dados iniciais..."
# npx prisma db seed

# Voltar para o diretório raiz
cd /app

# Iniciar a aplicação
echo "Iniciando aplicação..."
exec yarn start:dev fidelity
