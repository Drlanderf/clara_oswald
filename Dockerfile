FROM node:18-slim
WORKDIR /app/
COPY .env ./
COPY package*.json ./
RUN npm i @napi-rs/canvas
RUN apt-get update && apt-get install -y fontconfig
COPY . .


