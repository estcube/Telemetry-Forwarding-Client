#!/bin/bash

sudo apt update
sudo apt install python3-pip
pip3 install -r requirements.txt
sudo apt install python3-apsw
sudo apt install yarnpkg
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
sudo apt install grafana
grafana-cli plugins install natel-discrete-panel
grafana-cli plugins install frser-sqlite-datasource
cd ../frontend/
yarnpkg install -silent
yarnpkg build
cd ../client
sudo sh build.sh
cd ../dist
sudo chmod -R 777 ./
mkdir ./logs
touch ./logs/log_packets.log
touch ../ start_program_linux.sh
echo 'sudo systemctl start grafana-server' >> ../start_program_linux.sh
echo 'python3 ./dist/src/main.py' >> ../start_program_linux.sh
echo 'echo now open localhost:5000 with your preffered web browser' >> ../start_program_linux.sh
echo 'Now in main root folder do sh start_program_linux.sh to start the program'
