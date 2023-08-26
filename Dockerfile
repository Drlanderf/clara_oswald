FROM node:18

WORKDIR /app/

COPY package*.json ./

COPY . .

CMD ["node", "src/index.js"]
