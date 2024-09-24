## Comando para crear el container
 
 docker run --name ps8-dsw-hc4g-mo -e MYSQL_ROOT_HOST='%' -e MYSQL_ALLOW_EMPTY_PASSWORD="yes" -e MYSQL_PASSWORD="dsw" -e MYSQL_USER="dsw" -e MYSQL_DATABASE='consultorios'
 -p 3306:3306 -d percona/percona-server
