import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User } from '../models/User';
import { jwt } from '../config/auth';
import { AppError } from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

const invalidCombination = 'Incorrect email/password combination';

interface Response {
  user: User;
  token: string;
}
export class AuthenticateUserService {
  async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError(invalidCombination, 401);
    }

    // user.password -> Senha criptografada
    // passwrd -> Senha não criptografada

    const passwordMathced = await compare(password, user.password);

    if (!passwordMathced) {
      throw new AppError(invalidCombination, 401);
    }

    const token = sign({}, jwt.secret, {
      subject: user.id,
      expiresIn: jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
