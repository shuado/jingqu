#!/bin/bash
###
 # @Author: 舒 shd_cn@163.com
 # @Date: 2023-09-19 15:24:16
 # @Description: 打包配置
 # @Params: yolion    
### 

# 设置颜色变红的ANSI转义码
RED='\033[0;31m'
# 设置颜色变绿的ANSI转义码
GREEN='\033[0;32m'
# 设置颜色变蓝的ANSI转义码
BLUE='\033[0;34m'
# 设置颜色变黄的ANSI转义码
YELLOW='\033[1;33m'
# 重置ANSI颜色，以免影响后续输出
NC='\033[0m'

echo "${BLUE}====================正在匹配打包项目===================="

echo "${GREEN}打包项目：$1"

sh ./src/config/config-item/$1/build.sh $2
