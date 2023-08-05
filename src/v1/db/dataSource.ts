import { model } from "mongoose";
import { DataSource } from "typeorm";
import { secret } from "../../secrets";
import { Users } from "./models/users";
import { Task } from "./models/task";
import { db } from "../../secrets";
export const AppDataSource = new DataSource({
  type: secret.dbConfig.type as db,
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
});
