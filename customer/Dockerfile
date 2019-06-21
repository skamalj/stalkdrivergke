FROM node:10

COPY . /home/customer

RUN ls -l /home/customer

WORKDIR /home/customer

RUN npm install

CMD ["node", "app.js"]
