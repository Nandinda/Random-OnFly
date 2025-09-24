# n8n Custom Node — Random

Neste repositório, há um custom node para n8n que gera um número inteiro aleatório usando o endpoint GET do Random.org.
- **Min** → valor mínimo (inteiro)  
- **Max** → valor máximo (inteiro)  

Retorna um número aleatório entre `Min` e `Max` (inclusive). 

## Pré-requisitos
- Docker & Docker Compose
Baixe o Docker em: `https://www.docker.com/`
No Docker, configure o n8n para a porta 5678
- Node.js + npm (caso queira compilar o node localmente)

## Como rodar 
1. Garanta que a pasta `./.n8n/custom/Random` exista com os arquivos `dist/Random.node.js` (incluso nesta entrega).

2. Instale as dependências do projeto:

cd .n8n/custom/Random
npm install

3. O projeto já vem com um `docker-compose.yml` configurado.

4. Para rodar `docker-compose up -d`

    4.1 Para recomeçar após atualização: `docker-compose restart n8n`

5. Acesse: `http://localhost:5678` 

## Configuração do ambiente
No `docker-compose.yml`:

    - N8N_HOST=localhost
    - N8N_PORT=5678

    - DB_TYPE=postgresdb
    - DB_POSTGRESDB_HOST=postgres
    - DB_POSTGRESDB_PORT=5432
    - DB_POSTGRESDB_DATABASE=n8n
    - DB_POSTGRESDB_USER=n8n
    - DB_POSTGRESDB_PASSWORD=n8n

    - GENERIC_TIMEZONE=America/Sao_Paulo


## Como desenvolver / compilar localmente

cd ./.n8n/custom/Random
npm install
npm run build

## Testes
Se houver testes, rode:
`npm test`

## Observações técnicas e boas práticas
- O node faz chamadas ao endpoint público do Random.org (`/integers/?num=1&min=...&max=...&format=plain&rnd=new`). Há limites de uso para o endpoint público; para produção considere usar a API JSON-RPC com chaves e tratamento de quotas.
- Validações: Min e Max são verificados como inteiros; Min não pode ser maior que Max.
