const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const fetch = require('node-fetch');
const { response } = require('express');

//config handlebars
app.engine('handlebars', expressHandlebars({defaultLayout:'principal'}));
app.set('view engine','handlebars');


//config body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/publico'))



//Rotas
app.get('/',function(req,res){
    //method GET pois quero pegar informações da API 
    fetch('http://localhost:3000/clientes',{ method:"GET" })
    .then(response => response.json())
    .then(response => res.render('inicio',{dados:response}))

});

app.post("/cadastrar", function(req,res){
    let nome = req.body.nome;
    let idade = req.body.idade;

    //retorno do form
    let dados ={'nome':nome ,'idade':idade};

    fetch('http://localhost:3000/clientes',{
        //A caracteristica dessa rota é enviar então o method="POST"
        method:'POST',
       //As infromações que vamos utilizar: como cadastro 
       //Para a Api não entender como um texto então foi convertido para Json 
       body:JSON.stringify(dados),
       //Espicificando para minha APi que minha informação é um Json
       headers:{'Content-Type':'application/json'}
    })
    .then(res.redirect('/'));
});


app.listen(8080,function(){
    console.log('Servidor Rodando')
})