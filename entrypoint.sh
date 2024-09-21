#!/bin/sh

# Apply Prisma migrations and start the application
npx prisma migrate deploy
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Install a cross-platform version of argon2
npm install argon2

# Run the seed script
npm run seed

# Run the main container command
exec "$@"
