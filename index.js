const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const fileUpload = require("express-fileupload");

const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const port = process.env.PORT || 4000;
const app = express();
const prisma = new PrismaClient();


async function connectDB(){
    try {
        await prisma.$connect();
        console.log('? Database connected successfully');
    } catch (error) {
        console.log(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

connectDB();

app.use(cors())
app.use(fileUpload({useTempFiles: true}))
app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})
