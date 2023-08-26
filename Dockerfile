FROM node:18-slim

WORKDIR /app/

RUN apt-get update && apt-get install -y fontconfig

COPY . .

CMD ["node", "src/index.js"]
