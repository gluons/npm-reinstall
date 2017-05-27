#!/usr/bin/env bash

docker build -t npm-reinstall:node4 -f Dockerfile.node4 .;
docker build -t npm-reinstall:node6 -f Dockerfile.node6 .;
docker build -t npm-reinstall:node7 -f Dockerfile.node7 .;
