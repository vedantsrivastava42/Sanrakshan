import express from 'express';
import multer from 'multer';
import { createApproval, updateApprovalStatus, getApprovalProgress } from '../Controllers/approvalController.js';
import storage from '../Config/cloudinary-storage.js';

const router = express.Router();
const upload = multer({ storage });

router.post('/', createApproval);
router.patch('/:referenceId', updateApprovalStatus);
router.get('/:referenceId', getApprovalProgress);
router.post('/upload', upload.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ fileUrl: req.file.path }); // Cloudinary URL
});

export default router;
