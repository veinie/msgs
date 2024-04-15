#!/bin/bash

pwd
ls
cd ./common
pwd
npm ci --omit=dev
cd ../userauth
pwd
npm ci --omit=dev
