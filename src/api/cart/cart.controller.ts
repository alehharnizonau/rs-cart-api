import { Body, Controller, Delete, Get, HttpStatus, Put, Req } from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { AppRequest, getUserIdFromRequest } from '../../shared';
import { CartService } from './services';
import { ProductService } from '../product/product.service';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    // private orderService: OrderService
  ) {
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    const mockUserId = '68280373-622a-4f24-8752-97905658958c';

    const cart = await this.cartService.findOrCreateByUserId(mockUserId);
    const products = await this.productService.getAllProducts();

    const data = cart.items.map(item => {
        const product = products.find((p) => p.id === item.product_id);
        return {
          product,
          count: item.count,
        };
      },
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data,
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body) { // TODO: validate body payload...
    const mockUserId = '68280373-622a-4f24-8752-97905658958c';

    const cartItem = await this.cartService.updateByUserId(mockUserId, body);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: [cartItem],
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Delete()
  async clearUserCart(@Req() req: AppRequest) {
    await this.cartService.removeByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  // @Post('checkout')
  // async checkout(@Req() req: AppRequest, @Body() body) {
  //   const userId = getUserIdFromRequest(req);
  //   const cart = await this.cartService.findByUserId(userId);
  //
  //   if (!(cart && cart.items.length)) {
  //     const statusCode = HttpStatus.BAD_REQUEST;
  //     req.statusCode = statusCode
  //
  //     return {
  //       statusCode,
  //       message: 'Cart is empty',
  //     }
  //   }
  //
  //   const { id: cartId, items } = cart;
  //   const total = calculateCartTotal(cart);
  //   const order = this.orderService.create({
  //     ...body, // TODO: validate and pick only necessary data
  //     userId,
  //     cartId,
  //     items,
  //     total,
  //   });
  //   this.cartService.removeByUserId(userId);
  //
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'OK',
  //     data: { order }
  //   }
  // }
}
