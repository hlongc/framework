## 创建key的过程

### 1. openssl genrsa -des3 -passout pass:x -out server.pass.key 2048

### 2. openssl rsa -passin pass:x -in server.pass.key -out server.key

### 3. rm server.pass.key

### 4. openssl req -new -key server.key -out server.csr

### 5. openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt

创建http2证书和公钥
### openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \ -keyout key.pem -out cert.pem