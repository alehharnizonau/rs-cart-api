import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../../database/entities';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) {
  }

  async getAllProducts() {
    const response = await this.productRepository.find();
    return response.map((product) => {
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        count: product.stocks.count,
      };
    });
  }
}