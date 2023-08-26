FROM node:20-slim

WORKDIR /app/

COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y fontconfig

COPY . .

CMD ["node", "src/index.js"]
