const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const storage = require("./storage/memory");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.delete('/items/:id', (req, res) => {
    storage.deleteItem(req.params.id)
        .then(item => {
            if (!item) {
                res.status(404)
                    .send({
                        status: "INVALID_PARAM"
                    })
                return;
            }

            res.send({
                status: "OK",
                item
            })
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500)
        });
});

app.get('/items', (req, res) => {
    storage.getItems()
        .then(items => {
            res.send({
                status: "OK",
                items
            });
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});

app.get('/items/:id', (req, res) => {
    storage.getItem(req.params.id)
        .then(item => {
            if (!item) {
                res.status(404)
                    .send({
                        status: "INVALID_PARAM"
                    })
                return;
            }

            res.send({
                status: "OK",
                item
            });
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});

app.post('/items', (req, res) => {
    storage.createItem(req.body)
        .then(item => {
            if (!item) {
                res.sendStatus(500);
                return;
            }

            res.send({
                status: "OK",
                item
            });
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});

app.put('/items/:id', (req, res) => {
    storage.updateItem(req.params.id, req.body)
        .then(item => {
            if (!item) {
                res.status(404)
                    .send({
                        status: "INVALID_PARAM"
                    });
                return;
            }

            res.send({
                status: "OK",
                item
            });
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        });
});

app.listen(3400, () => console.log('Example app listening on port 3400!'));
