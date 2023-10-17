import helmet from "helmet";
import {config} from 'dotenv';
import { geoapify } from './controllers/geoapify';
import { getLocationGoogle } from './controllers/google';
import type { Request, Response } from 'express';

const express = require('express');
const morgan = require('morgan');
config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (_: Request, res: Response) => {
  res.json({
    success: true,
    message: "UP",
  });
});
app.post("/location", geoapify);
app.post("/location-google", getLocationGoogle);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

