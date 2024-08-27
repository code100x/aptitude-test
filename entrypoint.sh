#!/bin/sh

# Apply Prisma migrations and start the application
npx prisma migrate deploy
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init 
npm install @node-rs/argon2-linux-arm64-musl
npm run seed

# Run the main container command
exec "$@"