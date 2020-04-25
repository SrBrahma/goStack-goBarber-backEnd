import path from 'path';
import multer from 'multer';

const tmpDir = path.resolve(__dirname, '..', '..', 'tmp');

export const uploadConfig = {
  directory: tmpDir,
  storage: multer.diskStorage({
    destination: tmpDir,
    filename(req, file, callback) {
      const extension = path.extname(file.originalname);
      const filename = `${req.user.id}_${Date.now()}${extension}`;

      return callback(null, filename);
    },
  }),
};
