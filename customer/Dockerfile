FROM node:10

WORKDIR /home
COPY customer /home/customer

WORKDIR /home/customer

RUN npm install

CMD ["node", "app.js"]
