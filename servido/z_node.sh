
arquivo="/var/www/html/node2/servido/log_node.txt"
dataHora=$(date "+%d/%m/%Y %H:%M:%S")

texto="$dataHora - Script node executado! porta 8080"

echo $texto >> $arquivo
node /var/www/html/node2/servido/index.js
