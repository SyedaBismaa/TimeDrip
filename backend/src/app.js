const express = require('express');
const authRoutes = require('./routes/auth.routes')
const cookieParser = require('cookie-parser')
const productRoutes = require('./routes/product.routes')

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use("/api", productRoutes)


module.exports= app;