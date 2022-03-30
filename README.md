<h1>CODE CHALLENGE: GERENCIAMENTO DE CONTAS BANCÁRIAS</h1>

## Descrição:

<p> A presente aplicação é uma Rest Api para criar e gerir contas bancárias.
Precisando apenas de nome completo e CPF, como vísivel abaixo, é o suficiente para abrir uma conta. A API foi criada utilizando JavaScript com Node.JS + Express, seguindo a arquitetura MVC, onde todas as operações do CRUD estão implementadas com os devidos verbos HTTP. O banco de dados escolhidos foi o SQLite devido sua praticidade. </p>

## Status do Projeto

![Bagde](https://img.shields.io/badge/Status%20do%20Projeto-Concluído-red)

## Ferramentas necessárias:
<p>Atenção nesta parte, pois para utilizar esta Api você precisará instalar algumas ferramentas fundamentais na sua máquina, como: <a href="https://www.gitkraken.com/download?utm_term=git&utm_campaign=1+%7C+1+GK+Git+GUI+-+Search&utm_source=adwords&utm_medium=ppc&hsa_acc=1130375851&hsa_cam=393455543&hsa_grp=23981425823&hsa_ad=550570964612&hsa_src=g&hsa_tgt=kwd-247385313&hsa_kw=git&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gclid=Cj0KCQiA-qGNBhD3ARIsAO_o7ym_H2X6ZGqwCZJqFF5FFzq4fVkZ1h6JujQY4yk9UI5bf2cnWf-Ez-EaAstwEALw_wcB">Git</a> e o JavaScript com <a href="https://nodejs.org/en/download/">NodeJS</a>, além do gerenciador de pacotes npm e a framework express. 
<strong>Observação</strong> é recomendável a utilização de um editor de código que tenha familiaridade, caso não tenha com nenhum, recomenda-se o <a href="https://code.visualstudio.com/download">VsCode</a> pela intuitividade do mecanismo. </p>

# Dependências:

![Badge](https://img.shields.io/badge/"bodyparser"-"%5E1.19.1"-red)
![Badge](https://img.shields.io/badge/"cors"-"%5E2.8.5"-red)
![Badge](https://img.shields.io/badge/"dotenv"-"%5E16.0.0"-red)
![Badge](https://img.shields.io/badge/"express"-"%5E4.17.2"-red)
![Badge](https://img.shields.io/badge/"path"-"%5E0.12.7"-red)
![Badge](https://img.shields.io/badge/"sqlite3"-"%5E5.0.2"-red)

# Dependências de desenvolvimento:

![Badge](https://img.shields.io/badge/"jest"-"%5E2.0.15"-red)
![Badge](https://img.shields.io/badge/"nodemon"-"%5E2.0.15"-red)

## Iniciando passo a passo:

<p>
<ul> 
<li>Após a instalação das ferramentas, acesse o local em sua máquina onde deseja clonar o repositório, abra o terminal "Git Bash"
e rode o seguinte comando no terminal:</li>
  <li> git clone https://github.com/LuthGom/gerenciamento-contas-bancarias.git </li>
<li>Com o repositório aberto, instale as dependências necessárias com o seguinte comando no terminal:</li>
<li> npm install </li>
<li>Para instalar as dependências de desenvolvimento, rode o comando abaixo no terminal:</li>
<li> npm install nodemon --save-dev</li>
<li>Para iniciar a aplicação basta rodar o comando abaixo via terminal:</li>
<li> npm start</li>
<li> O servidor iniciará na porta:3000 (ou em algua outra porta, caso a porta 3000 esteja sendo utilizada) - acesse: http://localhost:3000/contas para listagem de contas cadastradas. </li>
<li> acesse: http://localhost:3000/registrosDeTransferencias para listagem de transferências bancárias realizadas </li>
<li> acesse: http://localhost:3000/registrosDeDepositos para listagem de depósitos bancários realizadas </li>
</ul>

## Atenção:
<p>
<ol>
 <li>É essencial salientar que a versão do NodeJs utilizada para desenvolvimento é a v16.13.1 x LTS, ou seja, é pertinente a instalação de versão igual ou superior para a impecável execução da mesma.</li>
 <li>Caso você por algum motivo venha a excluir o arquivo "database.db", que é o nosso banco de dados gerado com a ferramenta SQLite, rode o comando abaixo a fim de gerar outro banco de dados:</li>
 <li>$ node ./src/infra/sqlite3-db.js</li>
 </ol>
</p>

## Rotas da API 

(Contas)

| Método | Rota | Descrição |
| ------ | ---- | --------- |
| **GET** | `/contas` | Lista todas as contas |
| **GET** | `/despesas{id}` | Busca a despesa pelo {id} |
| **POST** | `/contas/abrirConta` | Adiciona uma nova conta bancária |
| **DELETE** | `/contas/deletarConta/:{cpf}` | Deleta a conta pelo {cpf} |

(Registro de tranferências e depósitos)

| Método | Rota | Descrição |
| ------ | ---- | --------- |
| **GET** | `/registrosDeDepositos` | Lista todos os registros de depósitos |
| **GET** | `/registrosDeTransferencias` | Lista todos os registros de depósitos |
| **PATCH** | `/operacoes/transferencia/:cpf` | Registra uma nova transferência bancária |
| **PATCH** | `/operacoes/deposito/:cpf` | Registra uma novo depósito bancário |

## Campos necessários para cadastrar uma nova conta:

```json
{
    "cpf": "string",
    "nome": string
}
```
## Campos necessários para fazer um depósito:

```json
{
    
    "saldo": decimal
}
```

## Campos necessários para fazer uma transferência:

```json
{
    "cpf": string
    "saldoTransferido": decimal
}
```

## OBS: os endpoints para depósito e transferência atualizam automaticamente as contas bancárias.


## Autor 🌈
<a href="https://www.linkedin.com/in/dev-luciano-mendes/">Luciano Mendes(Luth🌈) | Clique aqui para o meu Linkedin</a>
<p>Um ex quase professor de Química!
Depois de 3 anos cursando a Licenciatura, abandonei a graduaçao antes que entrasse em moldes sociais rígidos
e perdesse o viés educacional presente em mim!</p>
