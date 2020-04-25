import path from 'path';
import fs from 'fs';
import { getRepository } from 'typeorm';

import { User } from '../models/User';
import { uploadConfig } from '../config/upload';
import { AppError } from '../errors/AppError';

interface Request {
  userId: string;
  avatarFilename: string;
}

export class UpdateUserAvatarService {
  async execute({ userId, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new AppError('User not found');
    }

    // Delete previous avatar
    if (user.avatarPath) {
      const filePath = path.join(uploadConfig.directory, user.avatarPath);

      try {
        await fs.promises.unlink(filePath);
      } catch (err) {
        // console.log(err); // May be commented. This will be throwed most likely is file doesn't exist.
      }
    }

    user.avatarPath = avatarFilename;
    await usersRepository.save(user);

    return user;
  }
}
