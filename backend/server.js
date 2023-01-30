const express= require('express');
const colors= require('colors');
const dotenv= require('dotenv').config();
const connectDB= require('./config/db');
const port= process.env.PORT || 5000
connectDB()
const app= express()
const {errorHandler} = require('./middleware/errorMiddleware')


app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routes/goalroutes') )

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

