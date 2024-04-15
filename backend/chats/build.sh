#!/bin/bash

cd ./common
npm ci --omit=dev
cd ../chats
npm ci --omit=dev
