#!/bin/sh

echo "Running Sequelize migrations..."
npx sequelize-cli db:migrate

echo "Running Sequelize seeds..."
npx sequelize-cli db:seed:all

echo "Starting Node.js application..."
exec npm start 