FROM node:slim

WORKDIR /app

COPY . .

WORKDIR /app/jukebox-backend
RUN npm install

WORKDIR /app/jukebox-backend
CMD ["npm", "run", "dev"]

EXPOSE 3000