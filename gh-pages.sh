#!/bin/sh
# 错误时停止
set -e
# 删除上一次的github-pages文件夹
rm -rf ./github-pages 
# copy dist文件夹 生成github-pages目标文件夹
cp -r ./dist ./github-pages 
# copy CNAME 404.html到目标文件夹
cp CNAME 404.html ./github-pages 
# 进入目标文件夹
cd ./github-pages 
# 提交到本地仓库
git init
# 暂存内容
git add -A
# 提交说明
git commit -m 'Updates'
# 提交到 https://github.com/asasugar/vite-element-plus-admin.git 项目的 vite-element-plus-admin 分支
git push -f https://github.com/asasugar/vite-element-plus-admin.git master:vite-element-plus-admin
# 提交完成之后，删除.git
rm -rf .git
# 返回上一级路径
cd -