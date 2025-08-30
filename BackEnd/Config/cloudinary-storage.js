import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sanrakshan_uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf']
  }
});

export default storage;
