FROM node:20-slim

WORKDIR /code

# Copy package files first for better caching
COPY package.json yarn.lock ./

# Install dependencies (use --frozen-lockfile for production-like installs)
RUN yarn install --frozen-lockfile

# Copy all source files
COPY . .

EXPOSE 5173

# Explicitly set host and enable polling
CMD ["yarn", "dev", "--host", "0.0.0.0"]