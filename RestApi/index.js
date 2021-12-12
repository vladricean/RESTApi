const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json())



app.get('/dress', (req, res) => {
    res.status(200).send({
        dress: '👗',
        size: 'large'
    })
});

app.post('/dress/:id', (req, res) => {
    const { id } = req.params;
    const { logo } = req.body;

    if(!logo) {
        res.status(418).send({ message: 'We need a logo!' })
    }

    res.send({
        dress: `👗 with your ${logo} and ID of ${id}`,
    });

});

// NEW API

const dresses = [
    { id: 1, name: 'dress1'},
    { id: 2, name: 'dress2'},
    { id: 3, name: 'dress3'},
];

app.get('/', (req,res) => {
    res.send('Hello there!!!');
});

app.get('/api/dresses', (req, res) => {
    res.send(dresses);
});

app.get('/api/dresses/:id', (req, res) => {
    const dress = dresses.find(c => c.id === parseInt(req.params.id));
    if(!dress) res.status(404).send('The course with the given ID was not found.');
    res.send(dress);
});

app.post('/api/dresses', (req, res) => {
    const dress = {
        id: dresses.length + 1,
        name: req.body.name
    };
    dresses.push(dress);
    res.send(dress);
});

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)

