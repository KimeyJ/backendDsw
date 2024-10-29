## Comando para crear el container
 
 docker run --name ps8-dsw-hc4g-mo -e MYSQL_ROOT_HOST='%' -e MYSQL_ALLOW_EMPTY_PASSWORD="yes" -e MYSQL_PASSWORD="dsw" -e MYSQL_USER="dsw" -e MYSQL_DATABASE='consultorios'
 -p 3306:3306 -d percona/percona-server

## Dependencias
* pnpm add -D typescript@5.1.3
* pnpm add -D tsc-watch@6.0.4
* pnpm add -E express
* pnpm add -E -D typescript tsc-watch @types/express @types/node
* pnpm add -E @mikro-orm/core
* pnpm add -E @mikro-orm/MySQL
* pnpm add -E @mikro-orm/sql-highlighter
* pnpm add -E reflect-metadata
* pmpm add -E cors
* pnpm add -D @types/cors
* pnpm add -E bcrypt dotenv jsonwebtoken
* pnpm add -D @types/bcrypt
* pnpm add -D @types/jsonwebtoken
