import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carts } from './carts.entity';
import { Products } from './products.entity';

@Entity({name: 'cart_items'})
export class CartItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  cart_id: string;

  @Column('uuid')
  product_id: string;

  @Column({ type: 'integer' })
  count: number;

  @ManyToOne(
    () => Carts,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: Carts;

  @OneToOne(
    () => Products,
    product => product.id,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Products;
}