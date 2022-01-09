// RUN SERVER: nodemon server.js

const express = require('express');
const Joi = require('joi');
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

const DATABASE_URL = 'mongodb://localhost/users'
const mongoose = require('mongoose')
mongoose.connect(DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

// User schema
const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', usersSchema)

// Dress schema
const dressesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    instock: {
        type: String,
        required: true
    },
})

const Dress = mongoose.model('Dress', dressesSchema)


const bcrypt = require('bcrypt')

const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

// ************************ USERS ****************************** //
const users = [];

// get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch(err) {
        res.status(500).json({messsage: err.message})
    }
})

// create new user
app.post('/api/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = new User({ 
            name: req.body.name, 
            password: hashedPassword 
        })
        users.push(user)
        try {
            const newUser = await user.save()
            res.status(201).send("User created successfully!")
        } catch(err) {
            res.status(500).send("Something unexpected occured..")
        }
    } catch {
        res.status(500).send("Could not create a new user.")
    }
})

// login
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
// const dresses = [
//     { id: uuidv4(), name: 'Roll neck dress in sand', brand: "CRYSTAL", color: "white", size:"S", length:"short", price: "450", instock: "true"},
//     { id: uuidv4(), name: 'Beatrice bardot drape wrap', brand: "VESPER", color: "red", size:"M", length:"medium", price: "650", instock: "true"},
//     { id: uuidv4(), name: 'Tall square neck', brand: "ASOS DESIGN", color: "dark green", size:"L", length:"long", price: "350", instock: "false"},
// ];


app.get('/', (req, res) => {
    res.send('Welcome to our Dress Shop! :)');
});

app.get('/api/dresses', async (req, res) => {
    try {
        const dresses = await Dress.find()
        // res.send(dresses);
        res.json(dresses)
    } catch(err) {
        res.status(500).json({messsage: err.message})
    }
});

app.get('/api/dresses/:id', getDress, (req, res) => {
    res.send(res.dress)
});

// add new dress
app.post('/api/dresses', async (req, res) => {
    const { error } = validateDress(req.body);

    if(error) return res.status(400).send(error.details[0].message)

    const userId = uuidv4();

    const dress = new Dress ({
        id: userId,
        name: req.body.name,
        brand: req.body.brand,
        color: req.body.color,
        size: req.body.size,
        length: req.body.length,
        price: req.body.price,
        instock: req.body.instock
    })
    // dresses.push(dress);
    // res.send(dress);
    try {
        const newDress = await dress.save()
        res.status(201).send(dress)
    } catch(err) {
        res.status(500).send("Dress could not be added..")
    }
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
    dress.brand = req.body.brand;
    dress.color = req.body.color;
    dress.size = req.body.size;
    dress.length = req.body.length;
    dress.price = req.body.price;
    dress.instock = req.body.instock;

    // send something back (in case user is interested)
    res.send(dress);
});

app.delete('/api/dresses/:id', async (req, res) => {
    try {
        const dress = await Dress.findById(req.params.id);
        if(!dress) return res.status(404).send('The dress with the given ID was not found.');

         // delete
        await res.dress.remove()
        
        res.send(dress);
    } catch(err) {
        res.status(500).send("Dress could not be deleted..")
    }
});

function validateDress(dress){
    const schema = {
        name: Joi.string().min(3).required(),
        brand: Joi.string().min(2).required(),
        color: Joi.string().min(3).required(),
        size: Joi.string().min(1).required(),
        length: Joi.string().min(3).required(),
        price: Joi.string().min(2).required(),
        instock: Joi.string().min(3).required()
    };
    return Joi.validate(dress, schema);
}

async function getDress(req, res, next) {
    let dress
    try {
      dress = await Dress.findById(req.params.id)
      if (dress == null) {
        return res.status(404).json({ message: 'Cannot find dress' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.dress = dress
    next()
}

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)

