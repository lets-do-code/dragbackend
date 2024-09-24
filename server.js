import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import { DbConnection } from './database/DbConnection.js';

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;


// mongodb connection

DbConnection(process.env.MONGO_URI);


// import route
import { DataRoute } from './routes/DataRoutes.js';


app.use('/api', DataRoute);



app.listen(PORT, () => {
    console.clear()
    console.log(`Server listening on ${PORT}`);
});

