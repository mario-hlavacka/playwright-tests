FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Copy e2e tests project
COPY . /e2e

WORKDIR /e2e

# Install dependencies
RUN npm ci

# Run playwright test
CMD [ "npx", "playwright", "test", "--reporter=list" ]