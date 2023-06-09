import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CartItems } from './cartItems.entity';

export enum Status {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

@Entity({ name: 'carts' })
export class Carts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @UpdateDateColumn({ type: 'date', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'date', nullable: false })
  updated_at: Date;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @OneToMany(
    () => CartItems,
    cartItem => cartItem.cart,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  items: CartItems[];
}