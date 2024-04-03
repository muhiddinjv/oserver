FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm set strict-ssl false

RUN yarn install

COPY . .

RUN npm set strict-ssl true

RUN yarn build

EXPOSE 4000

CMD ["yarn", "run", "start:prod"]