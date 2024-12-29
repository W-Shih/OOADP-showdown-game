#!/bin/bash

# ---------------------------------------------------------------------------------------------------------------------
# 設置高亮提示符的檢查與設置
if grep -q "#force_color_prompt=yes" ~/.bashrc; then
  echo "Enabling force_color_prompt in .bashrc..."
  sed -i 's/#force_color_prompt=yes/force_color_prompt=yes/' ~/.bashrc
  source ~/.bashrc
else
  echo "force_color_prompt is already enabled."
fi

# ---------------------------------------------------------------------------------------------------------------------
# 檢查 Node.js 是否已安裝
if ! command -v node &> /dev/null; then
  echo "Node.js is not installed. Installing Node.js and npm..."
  
  # 更新系統並安裝基本工具
  export DEBIAN_FRONTEND=noninteractive
  apt-get update \
      && apt-get install -y \
          curl \
          wget \
          tree \
          sudo

  # 安裝 Node.js 和 npm
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
      && apt-get install -y nodejs \
      && npm install -g npm@latest \
      && npm cache clean --force

  # 清理快取
  apt-get clean \
      && rm -rf /var/lib/apt/lists/*

  echo "Node.js and npm installation completed."
else
  echo "Node.js is already installed. Version:"
  node -v
  npm -v
fi

echo "Provisioning completed successfully!"
