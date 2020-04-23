import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User } from '../models/User';
import { jwt } from '../config/auth';

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
  static async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error(invalidCombination);
    }

    // user.password -> Senha criptografada
    // passwrd -> Senha não criptografada

    const passwordMathced = await compare(password, user.password);

    if (!passwordMathced) {
      throw new Error(invalidCombination);
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
