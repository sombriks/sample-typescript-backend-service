FROM node:14-alpine

LABEL MAINTAINER="sombriks"

ENV NODE_ENV=production SECRET=ch4ng3-m3

ADD .eslintrc.js .prettierrc knexfile.js nest-cli.json package.json tsconfig.build.json tsconfig.json /app/ 
ADD src /app/src
ADD test /app/test
ADD migrations /app/migrations

RUN npm install ; npm run build

ENTRYPOINT npm start
