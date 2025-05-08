const app = require('./app.js');
const mongoose = require('mongoose');
const PORT = 3000;
const mongo_uri = "mongodb+srv://mguadalupeg:nAzfeH53iMkXpb0v@cluster0.c3u5atd.mongodb.net/ecommerce?retryWrites=true&w=majority";


mongoose.connect(mongo_uri)
    .then(() => {
        console.log("Conectado a la base de datos");

        app.listen(PORT, () => {
            console.log(`Servidor funcionando en el puerto ${PORT}`);
        });
    })

    .catch((err) => {
        console.log("Error al conectar a la base de datos", err);
    });