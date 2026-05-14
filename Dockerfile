# ---- Build stage ----
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Serve stage ----
FROM nginx:1.27-alpine AS runner

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built SPA
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx config: serve SPA with fallback to index.html for client-side routing
COPY nginx.conf /etc/nginx/nginx.conf

# Allow nginx to run as non-root user
RUN mkdir -p /var/cache/nginx /var/run \
    && chown -R nginx:nginx /var/cache/nginx /var/run /usr/share/nginx/html /etc/nginx \
    && chmod -R 755 /var/cache/nginx /var/run

USER nginx

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
