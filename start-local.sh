#!/usr/bin/env bash
# LibreTV 本地运行：仅监听 127.0.0.1，不对外暴露、不发布
# 用法：./start-local.sh          （前台运行，Ctrl+C 停止）
#       nohup ... &              （后台运行，见交付说明）
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -x ./node_modules/.bin/next ]; then
  echo "依赖未安装，请先执行: npm ci && npm run build" >&2
  exit 1
fi

if [ -f .env.local ]; then
  set -a
  # shellcheck disable=SC1091
  source .env.local
  set +a
fi

: "${PASSWORD:?请在 .env.local 中设置 PASSWORD}"

# 生产模式启动（需先 npm run build）；-H 限定只监听本机回环地址
exec ./node_modules/.bin/next start -p "${PORT:-8080}" -H 127.0.0.1
