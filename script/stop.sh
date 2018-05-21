#!/bin/bash

isExistApp = `sudo pm2 list`
if [[ -n  $isExistApp ]]; then
    sudo pm2 delete all       
fi



