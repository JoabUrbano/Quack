#!/bin/bash
set -e

echo "Iniciando serviço fidelity..."

# Navegar para o diretório da aplicação
cd /app/apps/fidelity

# Voltar para o diretório raiz
cd /app

# Iniciar a aplicação
echo "Iniciando aplicação..."
exec yarn start:dev fidelity
