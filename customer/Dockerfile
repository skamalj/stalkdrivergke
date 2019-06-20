FROM node:10

RUN ls -lt

WORKDIR /home
COPY /workspace/anthos-poc/customer /home/customer

WORKDIR /home/customer

RUN npm install

CMD ["node", "app.js"]
