#!/bin/bash


echo  "{ \
  \"name\": \"naive\", \
  \"description\": \"A package using naive versioning\", \
  \"author\": \"A confused individual <iam@confused.com>\", \
  \"dependencies\": {"

for i in $(grep require *.js|awk -F \' '{print $2}'|sort -u|egrep -v '^\s*$')
do
    echo "\"$i"\": "\"x\","
done
echo "}, \
  \"engine\": \"node 0.4.1\" }"