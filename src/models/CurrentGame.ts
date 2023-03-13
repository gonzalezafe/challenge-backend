import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class CurrentGame {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	current_word!: string;

	@Column()
	attempts!: number;

	@ManyToOne(() => User)
	user!: User;

	@Column()
	userId!: number;
}
