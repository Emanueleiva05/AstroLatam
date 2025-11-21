#!/bin/sh
set -e

echo "Esperando a que MySQL este listo"
sleep 10

echo "Corriendo Sequelize migrations..."
npx sequelize-cli db:migrate

echo "Corriendo Sequelize seeds..."
npx sequelize-cli db:seed:all

echo "Empezando aplicacion Node.js..."
exec npm run dev 