FROM node:20-slim

RUN apt-get update && apt-get install -y fontconfig ffmpeg build-essential python3

RUN apt-get upgrade

RUN npm install -g npm@9.8.1

WORKDIR /app/

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "src/index.js"]