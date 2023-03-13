import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GameResult {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	word!: string;

	@Column()
	user!: string;

	@Column()
	attempts!: number;

	@Column()
	createdAt!: Date;

	@Column({ default: false })
	success!: boolean;

	@Column({ nullable: true })
	endTime!: Date;
}
