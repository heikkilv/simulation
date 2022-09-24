FROM node:16.17-slim

RUN mkdir -p /station
WORKDIR /station

COPY . .
RUN npm clean-install

CMD [ "npm", "start"]
