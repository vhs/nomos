#!/bin/bash

cd "$(dirname "$(realpath "$0")")/.." || exit 255

pnpm dlx tsx@latest docker/dct/generate-dockerfile.ts > docker-compose/Dockerfile
