
cd core/
sudo docker build -t nomos.core:latest .

cd ../proxy
sudo docker build -t nomos.proxy:latest .

cd ../web
sudo docker build -t nomos.web:latest .
