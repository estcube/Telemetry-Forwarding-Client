#!/bin/bash

sudo apt update
sudo apt install python3-pip
pip3 install -r requirements.txt
sudo apt install python3-apsw
sudo apt install yarnpkg
cd ../frontend/
yarnpkg install -silent
yarnpkg build
cd ../client
sudo sh build.sh
sudo chmod -R 777 ../dist
mkdir ../dist/logs
touch ../dist/logs/log_packets.log
touch ../ start_program_linux.sh
echo 'python3 ./dist/src/main.py' >> ../start_program_linux.sh
echo 'echo now open localhost:5000 with your preffered web browser' >> ../start_program_linux.sh
echo 'Now in main root folder do sh start_program_linux.sh to start the program'
