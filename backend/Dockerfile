FROM node:20-slim

WORKDIR /backend

COPY package.json yarn.lock ./
COPY . .
RUN yarn set version stable
RUN yarn install
CMD ["yarn", "start"]
EXPOSE 3001
