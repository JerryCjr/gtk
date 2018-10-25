#!/bin/bash
# a => env; b => dir
a=$1
b=$2
echo $a $b

# 判断是否存在目录
if [ -z ${b} ];then
echo "未指定目录, 请指定目录"
else
echo "已经指定目录"
fi

# task
rm -rf ./dist/$b
gulp build --env=$a --name=$b

# api: dev or pro
if [ ${a} == "1" ];then
echo "${a}测试"
scp -r ./dist/$b root@192.168.0.5:/data/www/soft/template
else
echo "${a}线上"

fi
