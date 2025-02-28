#Uses node version 20 as our base image
FROM node:20

#Goes to the app directory
WORKDIR /home/vuyo/Downloads/mlondi/verifyInfluencers/backend/Dockerfile

#Copy package.json and package-lock.json
COPY  package.json ./

#install all dependencies
RUN npm install

#Copy the rest of our app into the container
COPY . .

#Set port environment variable
ENV PORT=4000

#Expose the port so our computer can access it
EXPOSE 9000