import { Request } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (request: Request, file, callBack) {
    let destinationFolder;

    if (file.mimetype.startsWith("video/")) {
      destinationFolder = path.join(__dirname, "..", "..", "uploads", "videos");
    } else if (file.mimetype.startsWith("audio/")) {
      destinationFolder = path.join(__dirname, "..", "..", "uploads", "audios");
    } else {
      destinationFolder = path.join(__dirname, "..", "..", "uploads", "photos");
    }

    callBack(null, destinationFolder);
  },
  filename: function (request: Request, file, callBack) {
    callBack(null, Date.now() + "_" + file.originalname);
  },
});

const photoUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50, // 50 MB por arquivo
    files: 9, // até 9 arquivos por vez
  },
  fileFilter: function (request: Request, file, callBack) {
    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedFileTypes.includes(file.mimetype)) {
      return callBack(new Error("Apenas os formatos Jpeg, PNG and JPG são suportados"));
    }

    callBack(null, true);
  },
});

const audioUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 7, // 7 MB por arquivo
    files: 10,
  },
  fileFilter: function (request, file, callBack) {
    const allowedAudioTypes = ["audio/mp3", "audio/m4a"];

    if (!allowedAudioTypes.includes(file.mimetype)) {
      return callBack(new Error("Apenas os formatos MP3 e M4A são suportados"));
    }

    callBack(null, true);
  },
});

export { photoUpload, audioUpload };