import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: string


    @Column()
    email: string

    @Column()
    password: string
}