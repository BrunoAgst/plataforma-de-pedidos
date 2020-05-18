const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');


router.get("/detalhes/:slug", auth, (req, res) => {
    var slug = req.params.slug;
    
    axios.get(`http://localhost:3000/produtos/${slug}`).then(response => {
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
    

    axios.post(`http://localhost:3000/produto/${id}`, produto).then(() => {
        res.redirect("/");
    }).catch(err => {
        console.log(err);
    });
    
});

router.get("/editar-pedido/:id", auth, (req, res) => {
    var id = req.params.id;
    
    axios.get(`http://localhost:3000/produto/${id}`).then(response =>{
        res.render("editar-pedido", {pedidos: response.data});
    }).catch(err => {
        console.log(err);
    });
});

router.post("/editar-pedido/update", auth, (req, res) =>{
    var {id,nome, quantidade, kg, preco} = req.body;
    
    var produto = {
        nome: nome,
        quantidade: quantidade,
        kg: kg,
        preco: preco
    }
    if(produto != ""){
        axios.put(`http://localhost:3000/produto/${id}`, produto).then(response => {
            res.redirect("/");
        }).catch(err => {
            console.log(err);
        });
    }else{
        alert("Erro")
        res.redirect("/");
    }

});

router.post("/excluir-pedido", auth, (req,res) => {
    var id = req.body.id;

    if(id != ""){
        axios.delete(`http://localhost:3000/produto/${id}`).then(response => {
            res.redirect("/");
        }).catch(err => {
            console.log(err);
        });
    }else{
        alert("Erro");
        res.redirect("/");
    }
    
});

module.exports = router;