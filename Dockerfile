FROM node:20-alpine

WORKDIR /app


COPY package* .
COPY ./prisma .
COPY next.config.mjs .
COPY postcss.config.mjs .
COPY tailwind.config.ts .
COPY components.json .
COPY .env.sample .
COPY entrypoint.sh /app/entrypoint.sh


RUN chmod +x /app/entrypoint.sh


RUN npm install
RUN npx prisma generate


COPY . .

EXPOSE 3000

ENTRYPOINT [ "/app/entrypoint.sh" ]
CMD ["npm","run", "dev"]