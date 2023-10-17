import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import {config} from 'dotenv';
import { geoapify } from './controllers/geoapify';
import { getLocationGoogle } from './controllers/google';
config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
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

