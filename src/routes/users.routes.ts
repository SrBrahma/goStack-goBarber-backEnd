import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

// Rotas: Receber a requisição, chamar outro arquivo, devolver uma respota
export const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

