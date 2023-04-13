#!/bin/sh
# 错误时停止
set -e
# copy CNAME 404.html到目标文件夹
cp CNAME 404.html ./dist
# dist文件夹添加到暂存区
git add dist -A
# 提交说明
git commit -m 'Updates'
# 提交到 https://github.com/asasugar/vite-element-plus-admin.git 项目的 vite-element-plus-admin 分支
git push -f https://github.com/asasugar/vite-element-plus-admin.git master:vite-element-plus-admin
cd -