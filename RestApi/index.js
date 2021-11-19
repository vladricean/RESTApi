const express = require('express');
const app = express();
const PORT = 8080

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

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)

