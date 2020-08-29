cd client && yarn && yarn build && cd ..
docker-compose down
docker-compose up --build -d