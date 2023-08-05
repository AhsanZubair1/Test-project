import dotenv from "dotenv";
dotenv.config();

interface secrets {
  port: number;
  dbConfig: {
    type: string | undefined;
    host: string| undefined;
    port: number| undefined;
    username: string| undefined;
    password: string| undefined;
    database: string| undefined;
  };
  secret: string| undefined;
}
const secret: secrets = {
  port: parseInt(process.env.PORT!),
  dbConfig: {
    type: process.env.DB_TYPE ,
    host: process.env.HOST,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  },
  secret: process.env.SECERT
};

export default secret;
