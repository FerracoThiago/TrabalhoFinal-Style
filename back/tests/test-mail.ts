import configDotenv from "../src/config/dotenv";
configDotenv();

import { Mailer } from "../src/config/mail";

Mailer.sendEmail(
  "teste@exemplo.com",
  "Email de teste",
  "Teste concluido com sucesso!"
);