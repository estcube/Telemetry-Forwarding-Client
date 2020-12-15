#!/bin/bash

sudo apt update
sudo apt install python3-pip
pip3 install -r requirements.txt
sudo apt install python3-apsw
sudo apt install yarnpkg
sudo apt install curl

cd ../frontend
yarnpkg install -silent
yarnpkg build
cd ../client
sudo sh build.sh
cd ../dist/
sudo wget https://dl.grafana.com/oss/release/grafana-7.3.5.linux-amd64.tar.gz
tar -zxvf grafana-7.3.5.linux-amd64.tar.gz
sudo rm grafana-7.3.5.linux-amd64.tar.gz 
sudo mv grafana-7.3.5/ grafana
cd grafana/plugins-bundled/
sudo wget https://github.com/estcube/grafana-sqlite-datasource/archive/v0.1.3.zip
sudo unzip v0.1.3.zip
sudo rm v0.1.3.zip
sudo curl --output "grafana-natel-discrete-panel-0.1.0.zip" -L https://grafana.com/api/plugins/natel-discrete-panel/versions/0.1.0/download
sudo unzip grafana-natel-discrete-panel-0.1.0.zip
rm grafana-natel-discrete-panel-0.1.0.zip
cd ../../.. #root

sudo cp -rf ./grafana_data/* ./dist/grafana

sudo chmod -R 777 ./
mkdir ./logs
touch ./logs/log_packets.log
touch ../ start_program_linux.sh
echo 'cd dist/grafana' >> ./start_program_linux.sh
echo 'sudo nohup ./bin/grafana-server -config ./conf/defaults.ini web &' >> ./start_program_linux.sh
echo 'cd ../src' >> ./start_program_linux.sh
echo 'sudo python3 main.py' >> ./start_program_linux.sh
echo 'echo now open localhost:5000 with your preffered web browser' >> ./start_program_linux.sh
echo 'Now in main root folder do sh start_program_linux.sh to start the program'
