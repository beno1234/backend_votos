const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());

// Configuração do banco de dados
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ae@1254453",
  database: "votacoes",
});

// Conexão com o banco de dados
connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados!");
});

// Rota para registrar um voto
app.post("/votar/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "UPDATE votacao SET votos = votos + 1 WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Erro ao registrar o voto:", err);
        res.status(500).send("Erro ao registrar o voto");
        return;
      }

      res.sendStatus(200);
    }
  );
});

// Rota para obter a contagem de votos
app.get("/contagem", (req, res) => {
  connection.query(
    "SELECT nome, votos FROM votacao ORDER BY votos DESC",
    (err, results) => {
      if (err) {
        console.error("Erro ao obter a contagem de votos:", err);
        res.status(500).send("Erro ao obter a contagem de votos");
        return;
      }

      res.json(results);
    }
  );
});

// Inicia o servidor
app.listen(3000, () => {
  console.log("Servidor iniciado em http://localhost:3000");
});
