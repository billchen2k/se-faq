> Forked from BillChen2K/se-faq.
>
> Modified static contents as CS-FAQ now.
>
> Additional features will be merged back to the original repository.
>

# se-faq

A guide and simple QA platform for Computer Science freshmen in East China Normal University.

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
git clone https://github.com/jxtxzzw/se-faq
cd se-faq
cd client && yarn && yarn build && cd ..
```

Copy `client/Dockerfile.sample` as `client/Dockerfile`;
Copy `server/Dockerfile.sample` as `server/Dockerfile`;
Copy `docker-compose.yml.sample` as `docker-compose.yml`;

Then set password for mongodb. Change `server/Dockerfile`:
```
ENV MONGO_USER=youruser
ENV MONGO_PASS=youruser
```

Then change `docker-compose.yml`, set corresponding value for database initialization.

```
MONGO_INITDB_ROOT_USERNAME: youruser
MONGO_INITDB_ROOT_PASSWORD: youruser
```

You can change anything else as you like in these files. For example, the volumes mapping, the ports, etc.

Lastly
```
curl -fsSL https://get.docker.com -o get-docker.sh || sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

docker-compose up --build
```

Or simply `chmod +x deploy.sh && ./deploy.sh`.

Remember to modify the static messages in `client/static/constants`.

Any kinds of contribution is welcomed.
