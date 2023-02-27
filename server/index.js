import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js'; 

const app = express();
const PORT = process.env.PORT || 5000; 


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);  

const CONNECTION_URL = 'mongodb+srv://suraankit6:suraankit6@cluster0.savsgva.mongodb.net/memories?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

