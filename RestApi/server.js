const express = require('express');
const Joi = require('joi');
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

const bcrypt = require('bcrypt')

const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

// ************************ USERS ****************************** //
const users = [];

app.get('/api/users', (req, res) => {
    res.json(users)
})

app.post('/api/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send("User created successfully!")
    } catch {
        res.status(500).send("Could not create a new user.")
    }
})

app.post('/api/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user.')
    }
    try {
      if(await bcrypt.compare(req.body.password, user.password)) {
            res.send('Successfully logged in.')
      } else {
            res.send('Not Allowed.')
      }
    } catch {
        res.status(500).send()
    }
})

// *********************** DRESSES ***************************** //
const dresses = [
    { id: uuidv4(), name: 'dress1', color: "red"},
    { id: uuidv4(), name: 'dress2', color: "black"},
    { id: uuidv4(), name: 'dress3', color: "white"},
];


app.get('/', (req, res) => {
    res.send('Welcome to our Dress Shop! :)');
});

app.get('/api/dresses', (req, res) => {
    res.send(dresses);
});

app.get('/api/dresses/:id', (req, res) => {
    const dress = dresses.find(c => c.id === req.params.id);
    if(!dress) return res.status(404).send('The dress with the given ID was not found.');
    res.send(dress);
});

// add new dress
app.post('/api/dresses', (req, res) => {
    const { error } = validateDress(req.body);

    if(error) return res.status(400).send(error.details[0].message)

    const userId = uuidv4();

    const dress = {
        id: userId,
        name: req.body.name,
        color: req.body.color
    };
    dresses.push(dress);
    res.send(dress);
});

app.put('/api/dresses/:id', (req, res) => {
    // check user exists
    const dress = dresses.find(c => c.id === req.params.id);
    if(!dress) return res.status(404).send('The dress with the given ID was not found.');
    
    // check if request is valid
    const { error } = validateDress(req.body);
    if(error) return res.status(400).send(error.details[0].message)
        
    // update object
    dress.name = req.body.name;
    dress.color = req.body.color;

    // send something back (in case user is interested)
    res.send(dress);
});

app.delete('/api/dresses/:id', (req, res) => {
    const dress = dresses.find(c => c.id === req.params.id);
    if(!dress) return res.status(404).send('The dress with the given ID was not found.');

    // delete
    const index = dresses.indexOf(dress);
    dresses.splice(index, 1);
    
    res.send(dress);
});

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

