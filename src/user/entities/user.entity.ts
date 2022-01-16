import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
  // @Column() role: number;
}
