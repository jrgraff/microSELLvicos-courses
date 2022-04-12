import { Injectable } from '@nestjs/common';
import slugfy from 'slugify';

import { PrismaService } from '../database/prisma/prisma.service';

interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  listAllProducts() {
    return this.prisma.product.findMany();
  }

  async createProduct(data: CreateProductParams) {
    const slug = slugfy(data.title, {
      lower: true,
    });

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (productWithSameSlug) {
      throw new Error('Another product with same slug already exists!');
    }

    return this.prisma.product.create({
      data: {
        ...data,
        slug,
      },
    });
  }
}
