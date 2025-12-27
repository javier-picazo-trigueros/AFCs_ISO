FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --only=production

# Bundle app source
COPY . .

# Ensure db dir exists (volume will be mounted here in Fly)
RUN mkdir -p /app/db

EXPOSE 3000

CMD ["node", "server.js"]
