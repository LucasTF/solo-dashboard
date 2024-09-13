<h1 align="center">
  <img src="public/img/solo-logo.png" width="128" height="128" alt="Solo-Engenharia-Logo" />
  <br>
  Solo Dashboard
</h1>

<h3 align="center">Dashboard e API de gerência de obras, clientes e sondagens da empresa <a href="https://www.soloengenharia.tec.br">Solo Engenharia Ltda</a>.</h3>

<div align="center">
  <img alt="TypeScript" height="32px" src="https://api.iconify.design/logos:typescript-icon.svg" />
  <img alt="React" height="32px" src="https://api.iconify.design/logos:react.svg" />
  <img alt="NextJS" height="32px" src="https://api.iconify.design/logos:nextjs-icon.svg" />
  <img alt="TailwindCSS" height="32px" src="https://api.iconify.design/logos:tailwindcss-icon.svg" />
  <img alt="Python" height="32px" src="https://api.iconify.design/logos:python.svg" />
  <img alt="Flask" height="32px" src="https://api.iconify.design/logos:flask.svg" />
  <img alt="MySQL" height="32px" src="https://api.iconify.design/logos:mysql.svg" />
  <img alt="Docker" height="32px" src="https://api.iconify.design/logos:docker-icon.svg" />
</div>

<br>

<p align="center">
  <a href="#features">Funcionalidades</a> •
  <a href="#requirements">Requisitos</a> •
  <a href="#docs">Documentação</a> •
  <a href="#setup">Configuração inicial</a> •
  <a href="#deploy">Deploy</a> •
  <a href="#license">Licença</a>
</p>

<h2 id="features">Funcionalidades</h2>

- ✅ Flask REST API no padrão MVC
- ✅ Autenticação JWT
- ✅ Validação de dados com Zod (Frontend) & Pydantic (Backend)
- ✅ Upload & distribuição de arquivos
- ✅ Gerenciamento de autorização
- ✅ Gerenciamento de erros
- ✅ Paginação server-side
- ✅ Dark mode

<h2 id="requirements">Requisitos</h2>

- NodeJS 20.12.2+
- Python 3.12+
- MySQL/MariaDB
- Docker & Docker Compose (Opcional)

<h2 id="docs">Documentação</h2>

API documentada seguindo a especificação [OpenAPI 3.0 (OAS 3.0)](https://www.openapis.org/) disponível em `server/docs/openapi.yaml`.

Acessível e editável utilizando o [Swagger Editor](https://editor.swagger.io/).

<h2 id="setup">Configuração inicial</h2>

### Variáveis de ambiente

Crie um arquivo `.env` no diretório `server`, ou adicione as variáveis de ambiente ao seu sistema, utilizando o modelo disponível a baixo ou em `.env.example`:

```
# Database

DATABASE_USER=admin
DATABASE_PASSWORD=admin123
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_TABLE=soloapp_teste
DATABASE_ROOT_PASSWORD=admin123
DATABASE_CONN_STRING=mysql+pymysql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_TABLE}

# Authentication

## Secret JWT key
JWT_SECRET=YOUR_STRING_OF_SECRET_BYTES
## JWT encryption algorithm
JWT_ALGORITHM=HS256
## JWT duration (in hours | 720 hours = 30 days)
JWT_HOURS=720
```

#### Database

- DATABASE_USER: Usuário utilizado para acessar o banco MySQL/MariaDB.
- DATABASE_PASSWORD: Senha do usuário.
- DATABASE_HOST: Host onde o banco MySQL/MariaDB está sendo executado.
- DATABASE_PORT: Porta do banco MySQL/MariaDB (padrão 3306).
- DATABASE_TABLE: Nome do banco de dados onde serão criadas e armazenados os dados tabelados.
- DATABASE_ROOT_PASSWORD: Senha do usuário root. (Relevante se usar o banco MySQL presente no arquivo `docker-compose.yml`).
- DATABASE_CONN_STRING: String de conexão a ser usado pelo SQLAlchemy e Alembic (não alterar).

#### Authentication

- JWT_SECRET: Chave utilizada para assinar os tokens JWT de autenticação.
- JWT_ALGORITHM: Algoritmo utilizado para assinar os tokens com a chave secreta (padrão HS256).
- JWT_HOURS: Número de horas em que o token é válido (padrão 720, aproximadamente 1 mês).

### Criando uma chave JWT segura

Uma chave segura pode ser gerada utilizando NodeJS ou Python.

Python:

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

NodeJS:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Adicione a string gerada a chave `JWT_SECRET` em `.env` ou nas variaveis de ambiente do sistema.

### Criando e subindo container docker MySQL

Um banco de dados MySQL pode ser facilmente criado e iniciado como container utilizando o arquivo `docker-compose.yml` provido no diretório `server`.

Utilize o comando a baixo dentro do diretório `server` para criar e iniciar o container. Certifique-se que o Docker (e Docker compose) está instalado e em execução:

```bash
docker-compose up
```

#### To be complemented

### Comandos extras

```bash
alembic upgrade head
```
