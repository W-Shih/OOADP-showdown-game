#!/bin/bash

# ---------------------------------------------------------------------------------------------------------------------
export DEBIAN_FRONTEND=noninteractive

# ---------------------------------------------------------------------------------------------------------------------
# 更新系統並安裝基本工具
# Note:
#   當前 user 是 root, 所以不需要使用 sudo
echo "Installing system dependencies..."
apt-get update \
  && apt-get install -y \
    bash-completion \
    curl \
    dos2unix \
    sudo \
    tree \
    wget


# ---------------------------------------------------------------------------------------------------------------------
# 檢查 Node.js 是否已安裝
if ! command -v node &> /dev/null; then
  echo "Node.js is not installed. Installing Node.js and npm..."

  # 安裝 Node.js 和 npm
  # https://github.com/nodesource/distributions
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@11.0.0 \
    && npm cache clean --force
  # 不推薦使用最新版本的 npm, 因為這樣會導致環境不一致
  # npm install -g npm@latest

  echo "Node.js and npm installation completed."
else
  echo "Node.js is already installed. Version:"
  node -v
  npm -v
fi

# ---------------------------------------------------------------------------------------------------------------------
# 所有安裝完成後，統一清理快取
echo "Cleaning up package cache..."
apt-get clean \
  && rm -rf /var/lib/apt/lists/*


# ---------------------------------------------------------------------------------------------------------------------
# 當前 user 是 root, 要以 vagrant user 運行 configure-bashrc.sh
# Note: 
#   這個路徑是虛擬機中的路徑, 並以 /home/vagrant 為虛擬機中根目錄 ${HOME}.
#   並非以本機端的 provisioning.sh 或是 Vagrantfile 所在的目錄為根目錄.
# su - vagrant -c "whoami"  # verify using vagrant user to run the command
# echo "VM_PROJECT_ROOT is set to: ${VM_PROJECT_ROOT}"  # verify VM_PROJECT_ROOT has been set
su - vagrant -c "${VM_PROJECT_ROOT}/_dev-env/shared/configure-bashrc.sh"  # 虛擬機中的絕對路徑


# ---------------------------------------------------------------------------------------------------------------------
# Provisioning completed
echo "Provisioning completed successfully!"
