FROM node:18-slim

RUN apt-get update && apt-get install -y \
    curl \
    && apt-get clean

RUN npm install -g pnpm

WORKDIR /chartiq-project

# COPY package.json package-lock.json ./

COPY chartiq-9.4.0.tgz ./

# COPY ./chartiq /chartiq-project

COPY . /chartiq-project

RUN pnpm install --force

RUN pnpm list --depth 0

RUN ls -la

RUN tar -xzvf chartiq-9.4.0.tgz -C /chartiq-project

WORKDIR /chartiq-project/Services/chartIQ-JS

EXPOSE 3000

CMD ["pnpm", "start"]
