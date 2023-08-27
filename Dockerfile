FROM node:20

WORKDIR /app/

COPY package*.json ./

RUN apt-get update && apt-get install -y fontconfig

COPY . .

RUN npm i

CMD rm -r node_modules ; npm i ; node src/index.js