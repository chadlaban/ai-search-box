/* eslint-disable prettier/prettier */
const client = require("./databasepg.js");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

client.connect();

app.get("/ai_tools/", (req, res) => {
    client.query(`Select * from public.ai_tools`, (err, result) => {
        if(!err) {
            res.send(result.rows);
        } else {
            console.log(err);
        }
    });
    client.end;
});

app.get("/ai_tools/file_path", (req, res) => {
    client.query(`Select tool_id, screenshot_file_path from public.ai_tools`, (err, result) => {
        if(!err) {
            res.send(result.rows);
        } else {
            console.log(err);
        }
    });
    client.end;
});

app.get("/ai_tools/tool/:id", (req, res) => {
    const userId = req.params.id;

    client.query(`Select * from public.ai_tools Where tool_id = ${userId}`, (err, result) => {
        if(!err) {
            res.send(result.rows);
        } else {
            console.log(err);
        }
    });
    client.end;
});

app.get("/ai_use_case/", (req, res) => {
    client.query(`Select * from public.ai_use_case`, (err, result) => {
        if(!err) {
            res.send(result.rows);
        } else {
            console.log(err);
        }
    });
    client.end;
});