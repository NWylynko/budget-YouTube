FROM node:14-alpine
WORKDIR /app
COPY . .
ENV NODE_ENV production
RUN yarn install
RUN yarn build
EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]