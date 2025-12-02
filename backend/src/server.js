import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";

import notesRoutes from './routes/notesRoutes.js';
import {connectDB} from './config/db.js';
import rateLimiter from './moddlewere/rateLimiter.js';
const __dirname=path.resolve();  

dotenv.config();



const app = express();
app.use(express.json()); 
app.use(rateLimiter);
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// app.use(express.urlencoded({ extended: true }));
// // app.use((req,res,next)=>{
//     console.log("anan");
//     next();
// });
const PORT=process.env.PORT || 5001;


app.use("/api/notes", notesRoutes);
if(ENV.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));
  app.use((req,res)=>{
    res.sendDate(path.join(__dirname,"../frontend","dist","index.html"));
  })
}
connectDB().then(()=> {
app.listen(PORT, () => {
  console.log('Server is running on port ',PORT);
});
});