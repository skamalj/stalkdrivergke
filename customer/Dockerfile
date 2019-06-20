FROM ubuntu:16.04

RUN apt-get update -y && apt-get install -y curl 

RUN curl -sL https://deb.nodesource.com/setup_6.x | /bin/bash -

RUN apt-get update -y && apt-get install -y nodejs

RUN export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)" && \
    echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \
    apt-get update -y && apt-get install google-cloud-sdk -y

RUN ls -lt 

WORKDIR /home
COPY gke-firestore-microserv /home/gke-firestore-microserv

WORKDIR /home/gke-firestore-microserv

RUN npm install

CMD ["node", "app.js"]
