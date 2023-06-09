import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItems, Carts, Products } from '../../../database/entities';
import { Repository } from 'typeorm';
import { Status } from '../../../database/entities/carts.entity';
import { CartItem } from '../models';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Carts)
    private cartsRepository: Repository<Carts>,
    @InjectRepository(CartItems)
    private cartItemsRepository: Repository<CartItems>,
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) {
  }

  findByUserId(userId: string): Promise<Carts> {
    return this.cartsRepository.findOne({
      where: {
        user_id: userId,
        status: Status.OPEN,
      },
      relations: ['items'],
    });
  }

  createByUserId(userId: string): Promise<Carts> {
    const cart = new Carts();
    cart.user_id = userId;
    cart.created_at = new Date();
    cart.updated_at = new Date();
    cart.status = Status.OPEN;

    return this.cartsRepository.save(cart);
  }

  async findOrCreateByUserId(userId: string) {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, item: CartItem): Promise<CartItems> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    let cartItem = await this.cartItemsRepository.findOne({
      where: { cart_id: id, product_id: item.product.id },
    });

    if (cartItem) {
      cartItem.count = item.count;
      await this.cartItemsRepository.save(cartItem);
    } else {
      const product = await this.productRepository.findOne({
        where: {
          id: item.product.id,
        },
      });
      cartItem = new CartItems();
      cartItem.cart_id = id;
      cartItem.product_id = product.id;
      cartItem.count = item.count;

      await this.cartItemsRepository.save(cartItem);
    }
    return cartItem;
  }

  async removeByUserId(userId): Promise<void> {
    const cart = await this.cartsRepository.findOne({
      where: {
        user_id: userId,
      },
      relations: ['items'],
    });
    await this.cartItemsRepository.delete({ cart });
    await this.cartsRepository.remove(cart);
    console.log('Cart was deleted ', cart);
  }
}
