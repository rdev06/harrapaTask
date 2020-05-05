#!/bin/bash
git stash
git pull -f origin master
npm install
pm2 reload ECOM