# =====================================================================================================================
# multi-stage build: 
# Stage 1: 構建臨時容器以生成 node_modules 文件夾
FROM node:20.18-alpine3.20 as node_modules

RUN mkdir /app
WORKDIR /app

COPY package.json /app/
RUN npm install --omit=dev


# =====================================================================================================================
# Stage 2: 構建最終映像
FROM node:20.18-alpine3.20

# 更新 alpine 的套件清單、升級已安裝的套件、安裝 ca-certificates、curl，並刪除快取檔案
# 以確保套件是最新的, 並且避免安全性問題
RUN apk update && apk upgrade && apk add ca-certificates curl && rm -rf /var/cache/apk/*

WORKDIR /app
RUN chown -R node:node /app

COPY package.json /app/
COPY tsconfig.json /app/
COPY --from=node_modules /app/node_modules ./node_modules
COPY dist/src /app/

USER node
CMD ["node", "index.js"]
