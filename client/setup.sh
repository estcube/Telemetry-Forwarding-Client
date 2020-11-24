#!/bin/bash

sudo apt-get update
sudo apt-get install python3-pip
pip3 install -r requirements.txt
sudo apt-get install python3-apsw
sudo apt-get install yarnpkg
cd ../frontend/
yarnpkg install -silent
yarnpkg build
cd ../client
sudo sh build.sh
sudo chmod -R 777 ../dist
mkdir ../dist/logs
touch ../dist/logs/log_packets.log
echo "Now do in Telemetry-Forwarding-Client/dist/src 'python3 main.py' to start the program and go to localhost:5000 with your preferred web browser"