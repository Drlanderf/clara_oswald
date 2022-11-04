FROM node:16-slim

WORKDIR /app/

COPY package*.json ./

RUN npm install

RUN sudo apt-get install fontconfig

COPY . .

CMD ["node", "src/bot.js"]