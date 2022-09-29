import express from 'express'
import cors from 'cors'

import 'dotenv/config';



const initializeExpress = () => {
    const app = express();
  
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    app.listen(process.env.PORT || 3000);
  };



const initializeApp = async () => {
    initializeExpress();
  };

  initializeApp()