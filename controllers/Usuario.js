const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');


router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/logout", (req, res) => {
    req.session.usuario = undefined;
    res.redirect("login");
});

router.post("/authenticate", (req, res) => {
    var {email, senha} = req.body;
    var usuario = {
        email: email,
        senha: senha
    }

    axios.post("http://localhost:3000/usuario/login", usuario).then(response => {
        if(response.status == 200){
            req.session.usuario = {
                id: usuario.id,
                email: usuario.email
            };
            res.redirect("/");
        } 
    }).catch(err => {
        console.log(err);
        res.redirect("/login");
    });


});

router.get("/visualizar-usuarios", auth, (req, res) => {
    axios.get("http://localhost:3000/usuarios").then(response => {
        res.render("visualizar-usuarios", {usuarios: response.data});
    }).catch(err => {
        console.log(err);
    });
});

router.get("/novo-usuario", auth, (req, res) => {
    res.render("cadastrar-usuario");
});

router.post("/salvar-usuario", auth, (req, res) => {
    var {email, senha} = req.body;

    var usuario = {
        email: email,
        senha: senha
    }

    axios.post("http://localhost:3000/usuario", auth, usuario).then(() => {
        res.redirect("/visualizar-usuarios");
    }).catch(err => {
        console.log(err);
    });

});

router.post("/excluir-usuario", auth, (req, res) => {
    var id = req.body.id;
    
    axios.delete(`http://localhost:3000/usuario/${id}`).then(() => {
        res.redirect("visualizar-usuarios");
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;