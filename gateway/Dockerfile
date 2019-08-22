FROM node:latest

ENV NODE_ENV production
# this will enable polling, hot-reload will work on docker or network volumes
ENV CHOKIDAR_USEPOLLING true 

RUN mkdir -p /usr/src/gateway
WORKDIR /usr/src/gateway

COPY package*.json /usr/src/gateway/

RUN npm install

COPY . /usr/src/gateway/

#TODO need to remove when https is enabled
EXPOSE 8080

# HTTPS
EXPOSE 8443

EXPOSE 9877

CMD ["npm", "run", "start"]
