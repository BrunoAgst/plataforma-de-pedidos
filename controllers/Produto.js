const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');


router.get("/detalhes/:slug", auth, (req, res) => {
    var slug = req.params.slug;
    
    axios.get(`http://localhost:3000/produto/${slug}`).then(response => {
        res.render("detalhes", {produtos: response.data});
    }).catch(err => {
        console.log(err);
    });
});

router.get("/cadastrar-produto/:id", auth, (req, res) => {
    var id = req.params.id;

    axios.get(`http://localhost:3000/cliente/${id}`).then(response => {
        res.render("cadastrar-produto", {clientes: response.data});
    }).catch(err => {
        console.log(err);
    });
});

router.post("/salvar-produto", auth, (req, res) => {
    var {nome, id, quantidade, kg, preco} = req.body;

    var produto = {
        nome: nome,
        quantidade: quantidade,
        kg: kg,
        preco: preco
    }

    axios.post(`http://localhost:3000/produto/${id}`, auth, produto).then(() => {
        res.redirect("/");
    }).catch(err => {
        console.log(err);
    });
    
});

module.exports = router;