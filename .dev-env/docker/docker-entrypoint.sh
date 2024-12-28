#!/bin/bash

# ---------------------------------------------------------------------------------------------------------------------
# 當任一命令失敗時，立即退出腳本.
# 這是一個推薦的做法，避免腳本在出現錯誤後繼續執行，導致不可預測的狀況. 確保只有在所有命令成功執行的情況下，腳本才會完成.
# 特別是在腳本需要處理初始化、文件操作或安裝配置類操作時，能幫助快速捕捉錯誤。
set -e

# ---------------------------------------------------------------------------------------------------------------------
# 設置高亮提示符的檢查與設置
# 定義 .bashrc 路徑
BASHRC_PATH="${HOME}/.bashrc"

# 確保 .bashrc 文件存在
if [ ! -f "$BASHRC_PATH" ]; then
  echo "Creating $BASHRC_PATH..."
  touch "$BASHRC_PATH"
fi

# 啟用 force_color_prompt
if grep -q "#force_color_prompt=yes" "$BASHRC_PATH"; then
  echo "Enabling force_color_prompt in $BASHRC_PATH..."
  sed -i 's/#force_color_prompt=yes/force_color_prompt=yes/' "$BASHRC_PATH"
else
  echo "force_color_prompt=yes" >> "$BASHRC_PATH"
fi

# ---------------------------------------------------------------------------------------------------------------------
# 執行任何傳遞給 entrypoint 的命令
exec "$@"
