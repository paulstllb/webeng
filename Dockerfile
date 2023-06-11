FROM node:18

WORKDIR /app

LABEL authors="Paul Stallbaumer"

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Adjust the copy command to copy the built files to the correct location
RUN cp -r build/* /app/

EXPOSE 3001

CMD [ "node", "Server/server.js" ]