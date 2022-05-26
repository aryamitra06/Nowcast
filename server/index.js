import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';

import postsRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import commentRoutes from './routes/comments.js'

const app = express();

//some middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/', postsRoutes);
app.use('/', userRoutes);
app.use('/', commentRoutes);

const REMOTE_DB_URI = 'mongodb+srv://arya123:arya123@nowcast.vnepaoc.mongodb.net/nowcast?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(REMOTE_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('✅ Cloud Database connected');
})

app.listen(PORT, ()=> {
    console.log('✅ Server running');
})
