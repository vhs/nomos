FROM node

ADD . .

RUN apt update && apt install -y mysql-client
RUN npm ci

CMD npm start
