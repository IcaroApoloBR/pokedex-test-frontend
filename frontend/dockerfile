FROM node:20
WORKDIR /srv/app
COPY package.json ./
COPY vite.config.ts ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--host"]