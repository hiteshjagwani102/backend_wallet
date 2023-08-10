import * as dotenv from 'dotenv'
dotenv.config();
import express from "express";
import router from './routes'

let app = express();
app.use(express.json())
app.use(router);

app.listen(4000,async()=>{
    console.log(`Listening to port 4000`);
})
