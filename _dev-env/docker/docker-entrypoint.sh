#!/bin/bash

# ---------------------------------------------------------------------------------------------------------------------
# 當任一命令失敗時, 立即退出腳本.
# 這是一個推薦的做法, 避免腳本在出現錯誤後繼續執行, 導致不可預測的狀況. 確保只有在所有命令成功執行的情況下, 腳本才會完成.
# 特別是在腳本需要處理初始化、文件操作或安裝配置類操作時, 能幫助快速捕捉錯誤.
set -e

# ---------------------------------------------------------------------------------------------------------------------
# 運行 scripts
# ENTRYPOINT 指令用於設定容器啟動時執行的預設命令. 它定義了容器的主要用途，即容器啟動時應該執行的應用程式或腳本.
# 每次容器啟動都會執行 ENTRYPOINT, 所以 docker-entrypoint.sh 應該專注於應用程式啟動的必要步驟，而不是一次性的環境配置.
# 一次性的環境配置應該在 Dockerfile 中使用 RUN 指令完成.
# 
# 配置環境, 例如安裝軟體、設定檔案權限、創建目錄等.
# 這些操作應該在 Dockerfile 中使用 RUN 指令執行，因為它們只需要在 image 建構時執行一次。
# 
# 應用程式啟動, 例如啟動服務、執行應用程式、設置環境變量等.
# 這些操作應該在 docker-entrypoint.sh 中執行，因為它們需要在每次容器啟動時執行。

# ---------------------------------------------------------------------------------------------------------------------
# 檢查是否有傳入參數 by CMD or command, 若無則啟動 bash
if [[ $# -eq 0 ]]; then
  echo "No command provided, starting bash..."
  exec bash
else
  echo "Executing provided command: $@"
  exec "$@"
fi
