import express from "express";
import { photoUpload } from "../src/config/uploads";

const app = express();

app.post("/test-upload", photoUpload.single("photo"), (request, response) => {
  console.log(request.file);
  response.send("Upload recebido!");
});

app.listen(4000, () => {
  console.log("Servidor de teste rodando na porta 4000");
});