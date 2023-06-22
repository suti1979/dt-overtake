# Stage 1: Build the application
FROM node:16 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run the built application
FROM node:16
WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm install --only=production
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.js ./next.config.js
ENV NEXT_PUBLIC_SERVER_URL=http://backend:4000
EXPOSE 3000
CMD ["npm", "start"]
