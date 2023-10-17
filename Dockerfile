FROM node:18-buster-slim

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/
RUN npm run build

CMD ["node", "dist/index.js"]