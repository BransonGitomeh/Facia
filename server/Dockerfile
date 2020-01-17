# base image
FROM justadudewhohacks/opencv-nodejs

RUN ls

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json


# RUN apt-get update
# RUN apt-get install -y bash git openssh-server

# RUN npm install

# start app
CMD ["npm", "dev"]
