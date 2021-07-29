import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload{
    sub:string
}

export async function ensureAuthenticated(request:Request, response:Response,
  next:NextFunction):Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('Token missing!', 401);

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, 'f640a5dddf2150902bcae556d364a6366c090b3c') as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exists!', 401);

    next();
  } catch {
    throw new AppError('Invalid Token!', 401);
  }
}
