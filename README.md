# Projeto de Conclusão de curso (PD2)

# Work-Pass

## Rodar o Front-end

Para rodar o projeto front-end, siga os passos abaixo:

```bash
# Navegue até o diretório do front-end
cd Front

# Entre no diretório do app
cd app

# Instale as dependências
npm i

# Inicie o servidor web
npm run web

````
Agora você pode prosseguir para o back-end.

## Rodar o Back-end
Para rodar o projeto back-end, siga os passos abaixo:

Na pasta Back crie um arequivo .env e adicione o seguinte:

```bash
DATABASE_URL="mysql://{usuario}:{senhadoMysql}@localhost:3306/work_pass"
```

Entre no seu terminal Mysql e execute o comando:

```bash
create database work_pass
```
No terminal do projeto:

```bash

# Navegue até o diretório do back-end
cd Back

# Execute as migrações do Prisma
npx prisma migrate dev

# Inicie o servidor
node server.js

```

Após iniciar o back-end, o aplicativo estará pronto para ser utilizado.
