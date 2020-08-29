# se-faq

A guide and simple QA platform for Software Engineering freshmen in ECNU.

## Techstack:

- client: vue, vuetify, axios
- server: mongodb, express, mongoose
- deployment: docker

## Project deployment

```
apt install git npm
npm install npm@latest -g
npm install n -g
n latest
npm install yarn
git clone https://github.com/BillChen2K/se-faq
cd se-faq
cd client && yarn && yarn build && cd ..
```

Then set password for mongodb. Change server/Dockerfile:
```
ENV MONGO_USER=youruser
ENV MONGO_PASS=youruser
```
Then change docker-compose.yml, set corresponding value for database initialization.
```
MONGO_INITDB_ROOT_USERNAME: youruser
MONGO_INITDB_ROOT_PASSWORD: youruser
```
Lastly
```
curl -fsSL https://get.docker.com -o get-docker.sh || sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

docker-compose up --build
```

Any kinds of contribution is welcomed.