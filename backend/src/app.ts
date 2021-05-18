import 'reflect-metadata';
import express, { Application, NextFunction, Request, Response } from "express";
import cors from 'cors';
import { ValidationError } from 'class-validator';
import * as phone from './routes/phone';

const app: Application = express();

// Body parsing Middleware
app.use(cors());
// app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use('/phones', phone.router);

app.get(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
      message: "Hello World!",
    });
  }
);

// client error
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (Array.isArray(err) && err.every(e => e instanceof ValidationError)) {
    return res.status(400).json({
      details: err
    });
  }

  next(err);
});

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'Internal Server Error'
  });
});

export { app }