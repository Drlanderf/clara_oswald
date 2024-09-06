FROM node:22-slim

RUN apt-get update && apt-get install -y fontconfig ffmpeg build-essential python3

RUN apt-get upgrade -y

RUN npm install -g npm@10.8.3

WORKDIR /app/

COPY package*.json ./

RUN npm install --force

COPY . .

CMD ["node", "src/index.js"]