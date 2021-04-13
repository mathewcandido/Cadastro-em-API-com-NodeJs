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




app.listen(8080,function(){
    console.log('Servidor Rodando')
})