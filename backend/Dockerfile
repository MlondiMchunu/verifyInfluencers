#Uses node version 20 as our base image
FROM node:20

#Goes to the app directory
WORKDIR /home/vuyo/Downloads/mlondi/verifyInfluencers/backend/Dockerfile

#Copy package.json and package-lock.json
COPY  package.json ./

#install all dependencies
RUN npm install