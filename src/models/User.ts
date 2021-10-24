import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', length: 20 })
  firstName: string;

  @Column({ name: 'last_name', length: 20 })
  lastName: string;

  @Column()
  age: number;

  @Column({ unique: true })
  email: string

  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string

}