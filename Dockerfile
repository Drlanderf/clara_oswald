FROM node:16

WORKDIR /app/

COPY package*.json ./

RUN apt-get update && apt-get install -y fonts-open-sans

RUN npm i

COPY . .

CMD ["node", "src/bot.js"]