FROM node:16-alpine

ENV PORT 3000
ENV NEXTAUTH_URL https://auth.spacejoy.com
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn

# Bundle app source
COPY . /usr/src/app

RUN yarn build
EXPOSE 3000

CMD ["export", "NEXTAUTH_URL=http://localhost:3001"]
CMD [ "yarn", "start" ]
