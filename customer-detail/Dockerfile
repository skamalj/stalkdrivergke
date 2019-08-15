FROM node:10

COPY customer-detail /home/customer-detail

RUN ls -l /home

RUN ls -l /home/customer-detail

WORKDIR /home/customer-detail

RUN npm install

CMD ["node", "app.js"]
