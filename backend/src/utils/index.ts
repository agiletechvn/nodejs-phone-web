import { Request, Response, NextFunction } from "express"

type RequestHandlerPromise = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export const catchable = (fn: RequestHandlerPromise) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    next(err);
  }
}