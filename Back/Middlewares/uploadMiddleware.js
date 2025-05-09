const multer = require("multer");
const path = require("path");
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo inválido"), false);
  }
};

const upload = multer({ storage, fileFilter });

const storageTaskFile = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads/tasks');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Sanitizar o nome do arquivo
    const sanitizedName = file.originalname
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/\s+/g, '_');

    // Manter a extensão original do arquivo
    const fileExt = path.extname(file.originalname).toLowerCase();
    const fileName = `${Date.now()}-${sanitizedName.replace(/\.[^/.]+$/, '')}${fileExt}`;
    cb(null, fileName);
  },
});

const fileFilterTaskFile = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/pdf", 
    "image/jpeg", 
    "image/png", 
    "image/jpg"
  ];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Apenas arquivos PDF, JPEG, JPG e PNG são permitidos"), false);
  }
};

const uploadTaskFile = multer({ 
  storage: storageTaskFile, 
  fileFilter: fileFilterTaskFile 
});

module.exports= upload;

module.exports= uploadTaskFile;
