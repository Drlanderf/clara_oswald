FROM node:16

WORKDIR /app/

COPY package*.json ./

RUN npm i

COPY . .

CMD ["node", "src/bot.js"]