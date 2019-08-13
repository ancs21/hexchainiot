## Triển khai mạnh HexchainIoT

### Step 1. Tạo 1 cloud server cấu hình như sau:
```
OS: Ubuntu 18.04 LTS
CPU: 2 Core
RAM: 8GB
Disk: 20GB SSD
```

> Lưu ý: Mở cổng tường lửa nếu bạn sử dụng Google Cloud

### Step 2. Cài đặt Docker và Docker-Compose

- Cài đặt Docker stable
```
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce
sudo usermod -aG docker ${USER}
```

- Cài đặt Docker Compose
```
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

> Lưu ý: bạn cần `logout` server và đăng nhập lại, không cần restart

- Kiểm tra version
``` 
docker --version
docker-compose --version
```


