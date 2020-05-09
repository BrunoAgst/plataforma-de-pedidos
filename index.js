const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');

const produtoController = require('./controllers/Produto');
const clienteController = require('./controllers/Cliente');
const usuarioController = require('./controllers/Usuario');
const session = require("express-session");
const auth = require("./middleware/auth");

app.use(session({
    secret: "1dhjkshdkjashjdksa",
    cookie: {maxAge: 600000}
}));

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', produtoController);
app.use('/', clienteController);
app.use('/', usuarioController);


app.get("/", auth, (req, res) => {
    axios.get("http://localhost:3000/clientes").then(response => {
        res.render("index", {clientes: response.data});
    }).catch(err => {
        console.log(err);
    });
    
});

app.listen("3001", () => {console.log("servidor ok");});