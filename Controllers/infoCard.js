const express = require('express');
const router = express.Router();

const bancoDeDados = require('./bancoDeDados');

// RETORNA TODAS O USER
router.get('/', (request, response) => {
  bancoDeDados.conexao.query(`SELECT * FROM infocards`, (erro, resultado) => {
    if (!erro) {
      response.status(200).json(resultado);
    } else {
      response.status(400).json({ erro: erro });
    }
  });
});

// CADASTRA UM NOVO USER
router.post('/', (request, response) => {
  let title = request.body.title;
  let tag = request.body.tag;
  let description = request.body.description;

  bancoDeDados.conexao.query(
    `insert into infocards (title, tag, description) values ('${title}', '${tag}', '${description}')`,
    (erro, resposta) => {
      if (!erro) response.status(200).json({ Resposta: resposta });
      else response.status(400).json({ Erro: erro }).send();
    },
  );
});

module.exports = (api) => api.use('/api/infoCards', router);
