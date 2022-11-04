FROM node:16-slim

WORKDIR /app/

COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y fontconfig

COPY . .

CMD ["node", "src/bot.js"]