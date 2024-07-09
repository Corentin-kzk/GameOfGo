FROM node:14-alpine

RUN apk update \
    && apk upgrade \
    && apk add --no-cache \
    bash \
    vim

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

#RUN npm run build

CMD ["npm", "start"]
