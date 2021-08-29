FROM node:14-buster
WORKDIR /client
ENV PATH /client/node_modules/.bin:$PATH
COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci
COPY . .

EXPOSE 3000
CMD npm start