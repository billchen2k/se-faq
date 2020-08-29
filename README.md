# se-faq

A guide and simple QA platform for Software Engineering freshmen in ECNU.

## Techstack:

- client: vue, vuetify, axios
- server: mongodb, express, mongoose
- deployment: docker

## Project deployment

```
git clone https://github.com/BillChen2K/se-faq
cd se-faq
yarn && yarn build && cd ..
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
docker-compose up --build
```

Any kinds of contribution is welcomed.