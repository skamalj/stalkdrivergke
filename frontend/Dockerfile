FROM node:10

COPY . /home/frontend

RUN ls -l /home/frontend

WORKDIR /home/frontend

RUN npm install

CMD ["node", "app.js"]
