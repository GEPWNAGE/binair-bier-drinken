FROM node:12.9-alpine

WORKDIR /usr/src/app
RUN apk add --no-cache git

RUN git clone https://github.com/GEPWNAGE/binair-bier-drinken.git
RUN cd binair-bier-drinken && yarn && yarn build

RUN git clone https://github.com/GEPWNAGE/binair-bier-drinken-ws.git
RUN cd binair-bier-drinken-ws && yarn

COPY prod.env binair-bier-drinken-ws/.env

WORKDIR /usr/src/app/binair-bier-drinken-ws/

EXPOSE 5000

CMD ["yarn", "start"]
