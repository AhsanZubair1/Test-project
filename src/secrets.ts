import dotenv from "dotenv";
import { ConnectionOptions } from 'typeorm';
dotenv.config();
export type db = 'postgres'
interface secrets {
  port: number;
  dbConfig: {
    type:  ConnectionOptions['type'];
    host: string| undefined;
    port: number| undefined;
    username: string| undefined;
    password: string| undefined;
    database: string| undefined;
  };
  secret: string| undefined;
}
export const secret: secrets = {
  port: parseInt(process.env.PORT!),
  dbConfig: {
    type: process.env.DB_TYPE  as 'postgres',
    host: process.env.HOST,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  },
  secret: process.env.SECERT
};

