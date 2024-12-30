#!/bin/bash

# ---------------------------------------------------------------------------------------------------------------------
# 高亮提示符的檢查與設置
# 定義 .bashrc 路徑
BASHRC_PATH="${HOME}/.bashrc"

# 確保 .bashrc 文件存在
if [ ! -f "${BASHRC_PATH}" ]; then
  echo "Creating ${BASHRC_PATH}..."
  touch "${BASHRC_PATH}"
fi

# 啟用 bash 的高亮提示符 force_color_prompt
if grep -q "^#force_color_prompt=yes" "${BASHRC_PATH}"; then
  echo "Enabling force_color_prompt in ${BASHRC_PATH}..."
  sed -i 's/#force_color_prompt=yes/force_color_prompt=yes/' "${BASHRC_PATH}"
elif ! grep -q "^force_color_prompt=yes" "${BASHRC_PATH}"; then
  echo "Adding force_color_prompt to .bashrc..."
  echo "force_color_prompt=yes" >> "${BASHRC_PATH}"
else
  echo "force_color_prompt is already enabled."
fi

# 清理變量
unset BASHRC_PATH
