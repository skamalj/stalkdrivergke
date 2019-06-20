FROM node:10

RUN ls -lt

WORKDIR /home
COPY customer /home/customer

WORKDIR /home/customer

RUN npm install

CMD ["node", "app.js"]
