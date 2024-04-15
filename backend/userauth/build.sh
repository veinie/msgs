#!/bin/bash

cd ../common
npm ci --omit=dev
cd ../userauth
npm ci --omit=dev
