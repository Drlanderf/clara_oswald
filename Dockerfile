FROM node:16-alpine

WORKDIR /app/

COPY package*.json ./

RUN npm i

COPY . .

CMD ["node", "src/bot.js"]