import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column() first_name: string;
  @Column() last_name: string;
  @Column() email: string;
  @Column() password: string;
  @Column() country: string;
  @Column() city: string;
  @Column() locality: string;
  @Column() address: string;
  @Column() zip_code: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
