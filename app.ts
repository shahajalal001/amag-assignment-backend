import dotenv from 'dotenv'
dotenv.config()
import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import apiRoutes from "./routes/api";
import mongoose from "mongoose";

//For Production Use
// process.env.NODE_ENV = 'production'

mongoose.connect(process.env.DATABASE_URL).then((response) => {
    console.log('MongoDB Connected Successfully.')
}).catch((err) => {
    console.log('Database connection failed.')
})


const PORT = process.env.PORT
const app = express()
app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //* will allow from all cross domain
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next()
});
app.use(cors())
app.use('/api', apiRoutes)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});