FROM node:14

COPY package.json .

RUN yarn install

COPY . .

ENV NODE_ENV=production
ENV MONGO_URL=mongodb://db:27017/admin
ENV MONGO_USER=auser
ENV MONGO_PASS=apassword
ENV HOST=0.0.0.0
ENV PORT=3000

# 开放 3000 端口
EXPOSE 3000

# 设置镜像运行命令
CMD [ "node", "./bin/www" ]