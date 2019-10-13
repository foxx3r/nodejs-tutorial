# Tutorial de NodeJS

Este Tutorial é simples, nāo irei explicar muito sobre o que é o NodeJS, apenas para sabermos criar aplicações simples, então dividiremos este tutorial em dois:


**criando uma API**

**criando uma view com handlebars**

vamos começar configurando o nosso ambiente no Linux.

# Configuração

1 - Instale o NodeJS com:

`$ sudo apt install nodejs`

2 - Instale o NPM (Node Package Manager):

`$ sudo apt install npm`

3 - Instale o Yarn:

`$ sudo npm i -g yarn`

O Yarn é uma alternativa muito mais rápida, segura, confiável e na qual você pode baixar pacotes anteriormente baixados, criado pela equipe do Facebook.

4 - Crie uma pasta na sua HOME para o NodeJS:

`$ mkdir $HOME/nodejs`

5 - Entre neste diretório:

`$ cd $HOME/nodejs`

6 - Crie a pasta do projeto e entre nela:

`$ mkdir learn_nodejs`

`$ cd learn_nodejs`

7 - Crie uma pasta aonde ficará os códigos:

`$ nkdir src`

8 - Inicialize o projeto:

`$ yarn init --yes`

9 - Adicione as dependências necessárias:

`$ yarn add express dotenv express-handlebars helmet sequelize`

10 - Entre na pasta src:

`$ cd src`

# Prática

No arquivo server.js:

```js
const http = require("http")
const app = require("./api/middleware/app")
require("dotenv").config()

const server = http.createServer(app)
const PORT = process.env.PORT
const HOSTNAME = process.env.HOSTNAME

server.listen(PORT, HOSTNAME, () => {
    console.log(`servidor rodando na URL http://${HOSTNAME}:${PORT}`)
})
```

Em suas respectivas linhas:

1 - Importamos o módulo http, um módulo padrão do node e guardamos na variavel http

2 - Estamos importando o nosso arquivo que já iremos criar

3 - Importamos o módulo dotenv para guardar configurações sensíveis ou de fácil manipulaçāo no arquivo .env

5 - Criamos um listener nas configurações vindas do app.js

6 e 7 - Pegamos essas variáveis vindas do arquivo .env

9 - Colocamos o servidor para ouvir na porta e host especificado

**agora vamos abrir o arquivo .env**

```js
PORT=8080
HOSTNAME="127.0.0.1"
```

agora configuramos o nosso servidor para escutar na porta 8080 e em localhost (na nossa própria máquina, dependendo da sua conexāo, na sua rede também). Você pode alterar a porta no .env para outra porta (de preferência uma maior que 1024)

Agora vamos criar o diretório aonde ficará realmente a parte prática:

`$ mkdir api`

`$ cd api`

`$ mkdir model routes middleware`

# Conceitos

**API**

Uma API é um aplicação sem interface web, apenas serve informações. Vamos imaginar um servidor de um aplicativo móvel, WhatsApp por exemplo, você precisaria de uma interface web? No caso, você apenas precisaria mandar dados e receber de acordo com o que você mandou

**MVC**

O conceito MVC não é um conceito que usaremos aqui, mas ele tem um marco importante na história do back-end. Simplesmente uma aplicação MVC se organiza na seguinte estrutura de pastas:

```
model
view
control
```

a view é o que o cliente vê e interage (páginas por exemplo), o control è o que seria a parte do nosso server.js e o model è a parte do banco de dados.

**Middleware**

Um middleware é um "agente" que fica escutando em todas as requisições do seu servidor, vamos dar um exemplo com o Express:

```js
// isso é um middleware no express
app.use( (req, res, next) => {
    console.log("uma nova requisição")
})
```

já iremos explicar o que são req e res, mas simplesmente o next é o que autoriza a requisição a passar. Se formos rodar esta aplicação, a cada requisição o middleware vai mostrar no nosso terminal "uma nova requisição" mas não irá responder nem retornar nada ao cliente, por quê? Não colocamos o next() no final para ele deixar a requisição passar, simplesmente travava alí.

**rotas**

As rotas são parte importante da nossa aplicação, quando acessamos http://127.0.0.1:8080 estamos secretamente acessando a rota "/", vamos ser mais claros.

Qual a página na qual você faz login no Facebook? https://facebook.com/login e "/login" é a rota para fazer login.

**GET e POST**

O método GET é o mais comum, seu navegador o faz todo dia quando você acessa um site pela URL, ele faz uma requisição GET ao servidor na qual retorna um HTML e o navegador interpreta esse HTML. Como você pode ver, você pode fazer requisição GET simplesmente acessando a URL. Mas isso traz problemas, isso significa que você irá passar tudo pela URL e elas tem um limite de tamanho, fora que não é nada seguro e elegante passar sua senha e email pela URL, não?

É aí que entra o POST, o POST não pode ser acessado pela URL, apenas por formulários HTTP. Os dados não tem limite de tamanho, não são acessados por qualquer um (ou não rsrs, digamos apenas usúarios leigos) e não são enviados pela URL.

**public e arquivos estáticos**

Os arquivos estáticos ficam no diretório /public, ao configurarmos ele podemos acessar seu conteúdo facilmente. Por exemplo, as imagens podem ser acessadas na rota /images/nome_foto.png ou podemos configurar arquivos JavaScript e CSS externos sem guardar eles no mesmo local que estão os HTMLs. Exemplo de arquivos que guardariamos no public:

```
images
css
javascript
favicon
```

apesar de imagens serem guardadas em sua maioria no banco de dados NoSQL ou em CDN (servidor que entrega conteúdo em cache ao cliente) podem ser guardadas dentro do public já que não precisamos nos preocupar com coisas mais complexas e perfeitas.

**sessões**

O trabalho das sessões são manter um usúario logado no servidor, o problema das sessões é que cada usúario logado no servidor é um arquivo. Isto torna-o muito pesado.

**JWT**

O JWT utiliza hashs para verificar autenticidade dos tokens e passam informações únicas em seus tokens, referenciando o usúario no banco de dados.

# Voltando a prática

no diretório src/api/routes crie o arquivo api_1.0.0.js e escreva isso dentro dele:

```js
const express = require("express")
const app = express()
```

Nota: É uma boa prática versionar a API, vamos supor que seu cliente não atualizou o aplicativo, você adicionou e tirou um monte de coisas, então imediatamente o aplicativo para de funcionar.

Na linha `const app...` declaramos que app é igual a express(), utilizamos isso pois precisamos dos dois, o express em alguns casos vai nos servir e o app também. Mas qual a diferença? Simples, app não é clone do express, ele é como se o chamassemos assim:

`const app = require("express")()`

Agora vamos acrescentar isso ao mesmo arquivo:

```js
const helmet = require("helmet")
app.use(helmet())
```

Este módulo é um módulo que reúne outras 12 bibliotecas para desativar/ativar cabeçalhos HTTP na sua aplicação e deixa-la segura. Após isso, adicionamos este módulo ao express (ele é um middleware, percebeu?)

Vamos adicionar agora suporte para que possamos receber dados de formulários:

```js
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
```

Na primeira linha especificamos que queremos habilitar o recebimento de dados via URL, logo passamos um JSON de configuração no qual diz que não queremos aceitar outros tipos de dados (arquivos por exemplo). Logo abaixo, dizemos que aceitaremos dados JSON

Agora vamos criar 2 rotas GET:

```js
app.get("/", (req, res, next) => {
    res.send("<h1>Ola mundo</h1>")
})

app.get("/json", (req, res, next) => {
    res.status(200).json({
        hello: "World"
    })
})
```

na primeira linha criamos a rota / na qual passamos uma função logo após que recebe três argumentos: req, res, next. Bem... next você já sabe para quê que serve, o req se trata de tudo requisitado e res tudo o que será enviado. O método send do res nos envia uma string, que pode ser também interpretada como um HTML se você acessar pelo navegador.

logo abaixo criamos a rota /json na qual manda um status HTTP 200 (você pode ver os status Http nesse site https://pt.m.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_estado_HTTP ) que indica Ok, logo após mandamos um JSON.

agora vamos criar uma rota POST que irá retornar o nosso email e senha recebidos por um formulário.

```js
app.post("/teste", (req, res, next) => {
    res.send("seu email: " + req.body.email + " \nsua senha: " + req.body.password)
})
```

Lembra que configuramos o `app.use(express.urlencoded...)`? Então, ele habilita o req.body no qual o outro atributo é o nome do campo do formulário recebido. Um fato interessante é que se você tentar acessar o /teste pelo seu navegador, ele vai dar um erro "cannot GET /teste"

Agora vamos exportar o app:

```js
module.exports = app
```

Agora no arquivo src/api/middleware no arquivo app.js:

```js
const app = require("express")()
const api100 = require("../routes/api_1.0.0")

app.use("/api/1.0.0", api100)

module.exports = app
```

Na segunda linha importamos o arquivo das rotas, na linha abaixo configuramos eles para usarmos no nosso aplicativo com o prefixo /api/1.0.0, ou seja, o /teste será agora acessado na rota /api/1.0.0. Depois exportamos o app.

Como você pode lembrar, já fizemos tudo no server.js, tanto que lá nós demos um listen em cima do app.js no middleware.

Agora volte para a pasta que o server.js está localizado e digite:

`$ node server.js`

Para parar aperte CTRL + C, mas agora abra um novo terminal ou uma nova janela

Agora, para testar nossa API, vamos usar o HTTPie, baixe com o seguinte comando:

`$ sudo apt install httpie`

Primeiramente, bora testar a rota /, entre no seu navegador e digite http://127.0.0.1:8080/api/1.0.0/

Agora vamos usar o HTTPie para testar a nossa rota /teste enviando os seguintes formulários:

`$ http POST http://127.0.0.1:8080/api/1.0.0/teste email=joao@gmail.com password=123456`

# Criando um site

Vamos abrir o src/api/middleware/app.js, depois adicione isto ao seu arquivo (é importante que fique acima do module.exports):

```js
const usersRoute = require("../routes/users")

app.use("/", usersRoute)
```

Agora vamos no src/api/routes e vamos criar o users.js:

`$ touch users.js`

Após isso, adicione o seguinte no users.js:

```js
const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
```

O Handlebars é um pacote JavaScript que cria templatesnHTML, ele é bom para servir conteúdo dinâmico vindo do servidor. Por exemplo, em um site como o Facebook aonde postagens são atualizadas constantememte.

Agora vamos configurar o handlebars.

```js
app.engine("handlebars", handlebars({ defaultLayout: "main" }))

app.set("view engine", "handlebars")
```

nas duas linhas dizemos para o express que a view engine será o handlebars, e passamos como configuração que o layout principal terá o nome "main", você já irá entender seu uso.

Vamos agora habilitar o recebimento de formulários:

```js
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
```

Agora vamos criar umas rotas simples:

```js
app.get("/", (req, res, next) => {
    res.render("pages/home")
})

app.get("/register", (req, res, next) => {
    res.render("pages/register")
})

app.post("/register", (req, res, next) => {
    // ...
})
```

Agora usamos o res.render() que simplesmente irá chamar nosso HTML dentro do diretório pages/. Deixamos a rota POST /register sem nada pois iremos mexer nela ma8s para frente.

Agora vamos ao diretório src e vamos criar a pasta views:

`$ mkdir views`

E agora vamos entrar:

`$ cd views`

Após isso vamos criar 3 pastas:

`$ mkdir pages layouts partials`

Agora entre na pasta layouts e crie o arquivo main.handlebars nele, após isso escreva dentro (iremos usar Bootstrap, caso não esteja familiarizado, explicaremos tudo por detalhes):

```html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, shrink-to-fit=no" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <link rel="shortcut icon" type="image/x-icon" href="favicon/favicon.ico">
  </head>
  <body>
    {{>navbar}}
    <div class="container">
        {{>flash_messages}}
        {{{body}}}
    </div>
  </body>
</html>
```

Como você pode ver, é um HTML simples, com um porém... na linha `{{>navbar}}`, tudo que começa com > é a inclusão de um arquivo externo, no caso o navbar.handlebars dentro do src/views/partials. O `<div class="container">` è uma propriedade do bootstrap aonde tudo é organizado, estilizado e não ocupa a página inteira. O `{{>flash_messages}}` iremos falar mais para frente.

Agora vamos falar a diferença do {{ }} E {{{ }}}. O {{ }} renderiza um conteúdo escapando-o, ou seja, simbolos especiais serão transformados de acordo com seu código especial. Isso é eficaz pois evita de um usúario conseguir inserir uma tag `<script>` e conseguir injetar virús na página. O {{{ }}} não escapa o conteúdo, e o usamos aqui no {{{body}}} pois ele será todo o conteúdo HTML que iremos escrever daqui pra frente, sem precisar de escrever toda a estrutura HTML.

Agora vamos á um mini-tutorial de handlebars.

# Tutorial handlebars

```js
// arquivo imaginario que passa arrays ao handlebars
const numeros = [
    1,
    2,
    3,
    4
]
```

Como listar no handlebars:

```html
{{#each numeros}}
    <p>{{this}}</p>
{{/each}}
```

Para cada elemento no array numeros ele vai listar com `<p>`.

```js
// arquivo imaginario que passa objetos ao handlebars
const pessoa = {
    nome: "Joao",
    idade: 16,
    altura: 1.68
}
```

```html
{{#each pessoa}}
    <h1>{{nome}}</h1>
    <small>{{idade}}</small>
    <p>{{altura}}</p>
{{/each}}
```

Agora vamos passar condicionais ao handlebars:

```js
// arquivo que passa array vazio ao handlebars
const objetos = []
```

No handlebars:

```html
{{#if objetos}}
    <small>{{this}}</small>
{{else}}
    <h1>Nenhum objeto foi cadastrado ainda</h1>
{{/fi}}
```

O resultado será que nenhum objeto ainda foi cadastrado, pois objetos vazios, nulos ou indefinidos no JavaScript são considerados false.

# Criando a view

Agora vamos ao diretório src/views/pages e criar o arquivo home.handlebars, e vamos adicionar o seguinte nele:

```html
{{#if posts}}
    <div class="card">
    {{#each posts}}
        <div class="card-body">{{conteudo}}</div>
    {{/each}}
    </div>
{{else}}
    <h1>Nao existem posts ainda.</h1>
{{/if}}
```

Já iremos explicar o que queremos fazer. A class card do bootstrap gera tipo um "cartão" para a gente.

Agora vamos criar a parte do cadastro de posts, no mesmo diretório com nome de register.handlebars:

```html
<h1 class="text-center">Cadastro de usuarios</h1>
<form action="/register" method="post">
    <div class="form-group">
        <label for="nome">Seu nome:</label>
        <input type="text" name="nome" class="form-control" required />
    </div>
    <div class="form-group">
        <label for="conteudo">Post: </label>
        <textarea name="conteudo" class="form-control" required />
    </div>
    <button type="submit" class="btn btn-success">Enviar</button>
</form>
```

Nada de diferente até aí, a class form-group deixa o form mais bonito, o text-center deixa o texto no meio, o btn-success gera um botão verde, etc. Mas o action="/register" é para que rota ele irá redirecionar para o /register, com o method="post" ele fará a requisição via POST. O name="" será também importante para nós, ele quem indentificará cada campo e cada requisição, lembra do `$ http POST ... email=blabla`? Vamos supor que o "email" fosse o name="email", sacou?

Agora vamos ao src/api/model criar o arquivo connection_db.js, depois, insira isto no arquivo:

```js
const Sequelize = require("sequelize")
const sequelize = new Sequelize({
  dialect: "sqlite"
})

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}
```

Só que tem um porém... Toda vez que você reiniciar o servidor, os dados irão ser apagados pois não estão sendo salvos, caso queira que sejam salvos, abaixo do dialect passe o objeto storage com o nome do arquivo no qual você quer salvar.

Sequelize è um ORM, ou seja, te abstrai de todos os comandos SQL, e este ORM tem milhares e milhares de bancos de dados compativeis. O SQLite é um banco de dados extremamente rápido (não use-o na sua aplicação web, ele não é capaz de armazenar muitos dados) extremamente prático para nós, ele também não precisa de um servidor para rodar, perfeito para iniciantes. Para podermos usar o SQLite junto do Sequelize precisamos instalar a dependência do SQLite:

`$ yarn add sqlite3`

Bem... isto pode demorar um pouco, tive problemas com ele demorar 40 minutos para instalar, é só comigo mas vai que aconteça este imprevisto com você.

Agora no mesmo diretório, vamos criar o arquivo Post.js:

```js
const db = require("./connection_db")

const posts = db.sequelize.define("usersPost", {
  nome: {
    type: db.Sequelize.STRING, // tipo string
    allowNull: false, // não poderá ser nulo
    required: true, // será obrigatório
    timestamps: true // log de time ativado
  },
  conteudo: {
    type: db.Sequelize.TEXT, // tipo texto que armazena maiores quantidades que o string
    allowNull: true,
    required: false,
    timestamps: true
  }
})

posts.sync({ force: true })

module.exports = posts
```

Na demonstração acima, na terceira linha nós definimos uma tabela chamada "usersPost" na qual tem dois campos que devem serem preenchidos: nome e conteudo. Se você habilitou o storage como explicado acima, execute o servidor uma vez e apague a linha `posts.sync({ force: true })` pois ela irá re-criar a sua tabela toda vez que você iniciar o servidor.

Agora dentro do src/api/routes/users.js escreva o seguinte:

```js
const Post = require("../model/Post")
```

Isso irá importar o nosso banco de dados.

Agora vamos adicionar os arquivos estáticos

```js
app.use(express.static("public"))
app.use(express.static("views"))
```

Por último o helmet:

```js
const helmet = require("helmet")
app.use(helmet())
```

Agora vamos dar ao handlebars o poder de renderizar conteúdos dinâmicos, sobrescreva a rota /:

```js
app.get("/", (req, res, next) => {
    Post.findAll().then( (posts) => {
        res.render("pages/home", { posts: posts })
    })
})
```

A função findAll irá listar tudo o que estiver contido no banco de dados, e o .then (que será chamado caso a operação seja realizada com sucesso) irá receber um argumento que irá ser a quantidade de posts retornadas do banco de dados. Logo em seguida passamos o posts para o handlebars, que irá renderizar de forma dinâmica.

Agora vamos fazer a parte de cadastrar posts no banco de dados:

```js
app.post("/register", (req, res, next) => {
    Post.create({
        nome: req.body.nome,
        conteudo: req.body.conteudo
    }).then( () => {
        res.redirect("/")
    }).catch( (error) => {
        res.send("Ocorreu um erro ao cadastrar usuario no banco de dados")
        console.log(error)
    })
})
```

Na nossa rota, nós criamos o usúario com o campo nome sendo o conteudo do req.body.nome e aí por diante... Caso esta operação dê certo, ele irá redirecionar para a rota /, caso dê erro iremos informar ao usuario e logo após exibir o erro no terminal para que você possa depurar. Agora precisamos exportar o nosso projeto:

```js
module.exports = app
```

Calma... Estamos quase terminando, volte ao src e digite os seguintes comandos:

`$ mkdir public`

`$ cd public && mkdir css javascript images favicon`

Agora adicione qualquer foto dentro do favicon, já configuramos o favicon dentro do HTML caso não tenha percebido, se não, abra alguma rota e veja a mágica acontecendo perto da janela do seu navegador... :)

Não paramos por aqui, vamos ao src/views/partials e vamos criar o arquivo navbar.handlebars e adicionar o seguinte nela:

```html
<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <ul class="navbar-nav">
        <li class="nav-item active">
            <a class="nav-link" href="/">Home</a>
        </li>
        <li>
            <a class="nav-link" href="">Blog</a>
        </li>
        <li>
            <a class="nav-link" href="/contact">Fale conosco</a>
        </li>
        <li>
            <a class="nav-link" href="/register">Registrar</a>
        </li>
        <li>
            <a class="nav-link" href="/login">Login</a>
        </li>
    </ul>
</nav>
```

Não irei explicar tudo até porquê seria chato e complexo, você pode ver este tutorial https://www.w3schools.com/bootstrap/bootstrap_navbar.asp

Preste atenção que uns itens no navbar estão redirecionando para rotas não existentes, seu desafio é criar e implementar essas rotas.

Mas calma lá... precisamos no mesmo diretório, criar o flash_messages.handlebars, eu explicarei mais adiante sobre o que são mensagens flash quando implementarmos sessões.

```html
{{#if error_message}}
    <div class="alert alert-danger alert-dismissible fade show">
        <p class="text-center"><strong>Erro!</strong> {{error_message}}</p>
    </div>
{{/if}}

{{#if success_message}}
    <div class="alert alert-success alert-dismissible fade show">
        <p class="text-center"><strong>Sucesso!</strong> {{success_message}}</p>
    </div>
{{/if}}
```

Nos vemos na próxima :)
