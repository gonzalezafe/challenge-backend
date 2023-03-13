import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dictionary {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	word!: string;

	@Column({ default: false })
	used!: boolean;
}
