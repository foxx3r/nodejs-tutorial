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

`$ yarn add express dotenv express-handlebars helmet`

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

`model

view

control
`

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

`images

css

javascript

favicon`

apesar de imagens serem guardadas em sua maioria no banco de dados NoSQL ou em CDN (servidor que entrega conteúdo em cache ao cliente) podem ser guardadas dentro do public já que não precisamos nos preocupar com coisas mais complexas e perfeitas.

**sessões**

O trabalho das sessões são manter um usúario logado no servidor, o problema das sessões é que cada usúario logado no servidor é um arquivo. Isto torna-o muito pesado.

**JWT**

O JWT utiliza hashs para verificar autenticidade dos tokens e passam informações únicas em seus tokens, referenciando o úsuario no banco de dados.

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

`$ http POST http://127.0.0.1/api/1.0.0/teste email=joao@gmail.com password=123456`

Em breve ensinaremos como criar sites ao invés de APIs.
