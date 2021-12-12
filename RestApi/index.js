const express = require('express');
const Joi = require('joi');

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

const dresses = [
    { id: 1, name: 'dress1', color: "red"},
    { id: 2, name: 'dress2', color: "black"},
    { id: 3, name: 'dress3', color: "white"},
    { id: 4, name: 'dress4'},
];

app.get('/', (req, res) => {
    res.send('Welcome to our Dress Shop! :)');
});

app.get('/api/dresses', (req, res) => {
    res.send(dresses);
});

app.get('/api/dresses/:id', (req, res) => {
    const dress = dresses.find(c => c.id === parseInt(req.params.id));
    if(!dress) return res.status(404).send('The course with the given ID was not found.');
    res.send(dress);
});

app.post('/api/dresses', (req, res) => {
    const { error } = validateDress(req.body);

    if(error) return res.status(400).send(error.details[0].message)

    const dress = {
        id: dresses.length + 1,
        name: req.body.name,
        color: req.body.color
    };
    dresses.push(dress);
    res.send(dress);
});

app.put('/api/dresses/:id', (req, res) => {
    // verific ca exista
    const dress = dresses.find(c => c.id === parseInt(req.params.id));
    if(!dress) return res.status(404).send('The course with the given ID was not found.');
    
    // verific ca requestul e valid
    const { error } = validateDress(req.body);
    if(error) return res.status(400).send(error.details[0].message)
        
    // updatez obiectul
    dress.name = req.body.name;
    dress.color = req.body.color;

    // trimit inapoi ce am modificat (in cazul in care e interesat utilizatorul)
    res.send(dress);
});

app.delete('/api/dresses/:id', (req, res) => {
    const dress = dresses.find(c => c.id === parseInt(req.params.id));
    if(!dress) return res.status(404).send('The dress with the given ID was not found.');

    // delete
    const index = dresses.indexOf(dress);
    dresses.splice(index, 1);
    
    res.send(dress);
});

// app.get('/api/dresses', (req, res) => {
//     res.send(
//         req.query.id, 
//         req.query.color
//     );
// });

function validateDress(dress){
    const schema = {
        name: Joi.string().min(3).required(),
        color: Joi.string().min(3).required()
    };
    return Joi.validate(dress, schema);
}

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)

