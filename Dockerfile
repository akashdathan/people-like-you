FROM node:10.16.3

WORKDIR /app

COPY . /app
RUN npm install

RUN npm run build

RUN npm prune --production

CMD ["npm", "start"]