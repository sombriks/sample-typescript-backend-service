FROM node:14-alpine

LABEL MAINTAINER="sombriks"

ENV NODE_ENV=production SECRET=ch4ng3-m3

EXPOSE 3000

ADD .eslintrc.js .prettierrc knexfile.js nest-cli.json package.json tsconfig.build.json tsconfig.json /app/ 
ADD src /app/src
ADD test /app/test
ADD migrations /app/migrations

WORKDIR /app

RUN npm install ; npm run build

ENTRYPOINT npm start
