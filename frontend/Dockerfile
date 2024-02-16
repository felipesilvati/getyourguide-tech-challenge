# Build stage
FROM node:20 AS builder
WORKDIR /frontend
COPY package.json yarn.lock vite.config.js .yarnrc.yml index.html ./
COPY src ./src
RUN yarn set version stable
RUN yarn install
RUN yarn build

# Production stage
FROM node:20-slim
WORKDIR /frontend
COPY --from=builder /frontend .
COPY . .
CMD ["yarn", "preview"]
EXPOSE 4173
