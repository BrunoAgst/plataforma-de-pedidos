const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');


router.get("/cadastrar-cliente", auth, (req, res) => {
    res.render("cadastrar-cliente");
});

router.post("/salvar-cliente", auth,(req, res) => {
    var {nome, telefone, endereco} = req.body;

    var cliente = {
        nome: nome,
        telefone: telefone,
        endereco: endereco
    }

    axios.post("http://localhost:3000/cliente", cliente).then(() => {
        res.redirect("/");
    }).catch(err => {
        console.log(err);
    });
});

router.post("/excluir-cliente", auth, (req,res) => {
    var id = req.body.id;
    
    axios.delete(`http://localhost:3000/cliente/${id}`).then(() => {
        res.redirect("/");
    }).catch(err => {
        console.log(err);
        
    });
});

router.post("/editar-cliente/update", auth, (req, res) => {
    var {id, nome, telefone, endereco} = req.body;

    var cliente = {
        nome: nome,
        telefone: telefone,
        endereco: endereco
    }
    axios.put(`http://localhost:3000/cliente/${id}`, cliente).then(() => {
        res.redirect("/");
    }).catch(err => {
        console.log(err);
        
    });
});

router.get("/editar-cliente/:id",auth, (req, res) => {
    var id = req.params.id;

    axios.get(`http://localhost:3000/cliente/${id}`).then(response => {
        res.render("editar-cliente", {clientes: response.data});
    
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;