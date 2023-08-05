import { model } from "mongoose";
import { DataSource } from "typeorm";
import secret from "../../secrets";
import { Users } from "./models/users";
import { Task } from "./models/task";


console.log()
export const AppDataSource = new DataSource({
  type: "postgres",
  host: secret.dbConfig.host,
  port: secret.dbConfig.port,
  username: secret.dbConfig.username,
  password: secret.dbConfig.password,
  database: secret.dbConfig.database,
  synchronize: true,
  logging: true,
  entities: [Users, Task],
  subscribers: [],
  migrations: [],
})