FROM node:16-slim

WORKDIR /app/

COPY package*.json ./

RUN apt-get update && apt-get install -y fonts-open-sans

RUN npm i

COPY . .

RUN mv .env.exemple .env

CMD ["node", "src/bot.js"]