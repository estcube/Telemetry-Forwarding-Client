#!/bin/bash

sudo apt update
sudo apt install python3-pip
sudo apt install git
pip3 install -r requirements.txt
sudo apt install yarnpkg
sudo apt install curl

sudo chmod -R 777 ./
mkdir ./logs
touch ./logs/log_packets.log
touch ./ start_program_linux.sh
echo 'cd ./grafana' >> ./start_program_linux.sh
echo 'sudo nohup ./bin/grafana-server -config ./conf/defaults.ini web &' >> ./start_program_linux.sh
echo 'cd ../src' >> ./start_program_linux.sh
echo 'sudo python3 main.py' >> ./start_program_linux.sh
echo 'echo now open localhost:5000 with your preffered web browser' >> ./start_program_linux.sh
echo 'Now in main root folder do sh start_program_linux.sh to start the program'
