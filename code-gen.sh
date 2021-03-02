rm -rf ./temp/api
for arg in "$@"
do
    if [ ${arg} = '-f' ]
    then
      echo "force to update doc apis"
      rm -rf ./temp/md5
    fi
done

mkdir -p ./temp/md5

generateCode(){
  file=$1
  if [ -f ./doc/$file ]
     name="$(echo ${file%.*} | awk '{print tolower(substr($0,0,1))substr($0,2,length($0))}' )"
  then
    java -jar ./openapi-codegen/openapi-generator-cli.jar generate -i ./doc/$file -g typescript-fetch -t ./openapi-codegen/templates/typescript-fetch --additional-properties=typescriptThreePlus=true,  -o ./temp/api/$name
  fi
}


for file in $(ls ./doc)
do
    if [ -f ./temp/md5/${file/'yaml'/'md5'} ]
    then
      md5sum --status --check ./temp/md5/${file/'yaml'/'md5'}
      Result=$?
      if [ "$Result" = "1" ] #Using the "--status" option, md5sum won't print any output. Instead, the status code returns 0 if there are no changes, and 1 if the files don't match.
      then
        generateCode $file
      else echo "${file} no change"
      fi
    else generateCode $file
    fi
    md5sum ./doc/$file > ./temp/md5/${file/'yaml'/'md5'}

done

if [ -d ./temp/api/ ]
then
  if [ ! -d ./src/api ]
  then mkdir -p ./src/api
  fi
  rm ./temp/api/*/tsconfig.json
  cp -rf ./temp/api/* ./src/api
fi


