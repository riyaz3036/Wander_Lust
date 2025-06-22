import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads', 
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const ext = extname(file.originalname);
      const sanitizedName = file.originalname.replace(/\s+/g, '-').split('.')[0];
      cb(null, `${timestamp}-${sanitizedName}${ext}`);
    },
  }),
  fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new BadRequestException('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};
