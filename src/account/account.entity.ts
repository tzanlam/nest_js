import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Position {
    HOTELIER, RECEPTIONIST
}
@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    username!: string;

    @Column()
    fullName!: string;

    @Column()
    password!: string;

    @Column({unique: true})
    email!: string;

    @Column({type: 'enum', enum: Position})
    position!: Position;
}