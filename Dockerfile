# 1. Use an official Node.js image as base
FROM node:22-alpine AS builder

# 2. Set working directory in the container
WORKDIR /app

# 3. Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# 4. Copy the rest of the application
COPY . .

# 5. Build the Next.js application
RUN npm run build && npm prune --production

# 6. Use a lightweight Node.js image for the final container
FROM node:22-alpine AS runner

# 7. Set working directory and copy the built app
WORKDIR /app
COPY --from=builder /app ./

# 8. Set environment variables. Telemetry disabled
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# 9. Expose port 3000 (default for Next.js)
EXPOSE 3000

# 10. Start the Next.js application
CMD ["npm", "start"]
