# Use an official Node.js runtime as a base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
RUN git clone https://github.com/cypress-io/cypress-realworld-app.git .

# Install yarn
#RUN npm install -g yarn
# Install app dependencies
RUN yarn install

# Expose a port (if your app listens on a specific port)
EXPOSE 3000

# Define the command to run your app
CMD ["yarn", "dev"]