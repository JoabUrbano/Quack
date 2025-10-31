#!/bin/bash
set -e

echo "Iniciando serviço exchange..."

# Navegar para o diretório da aplicação
cd /app/apps/exchange

# Voltar para o diretório raiz
cd /app

# Iniciar a aplicação
echo "Iniciando aplicação..."
exec yarn start:dev exchange
