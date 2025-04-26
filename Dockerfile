FROM node:latest

RUN apt-get update && \
    apt-get install -y ffmpeg webp git python3 python3-pip && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /anya-gen<3
COPY package*.json ./
RUN npm install
COPY requirements.txt ./
RUN pip3 install -r requirements.txt
COPY . .
