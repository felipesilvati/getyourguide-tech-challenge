FROM cypress/included:latest

WORKDIR /e2e

# Install git (if not already present) and clone the wait-for-it repository
RUN if ! command -v git &> /dev/null; then \
        apt-get update && apt-get install -y git; \
    fi && \
    git clone https://github.com/vishnubob/wait-for-it.git && \
    mv wait-for-it/wait-for-it.sh /usr/local/bin/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it.sh

RUN apt update && apt install -y chromium

# Copy the e2e test directory into the image
COPY . /e2e

# No need to set an ENTRYPOINT or CMD here as they will be overridden by
# docker-compose command configuration
