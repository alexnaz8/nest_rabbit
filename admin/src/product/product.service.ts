import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  private products: ProductDto[] = [
    {
      id: '0',
      name: 'Plastic Cup1111',
      data: 'Synthetic product',
    },
    {
      id: '1',
      name: 'Bread',
      data: 'Natural product',
    },
    {
      id: '2',
      name: 'Water',
      data: 'Natural product',
    },
  ];

  async getAll() {
    return this.products;
  }

  async getById(id: string) {
    return this.products.find((item) => item.id === id);
  }

  async create(createProductDto: CreateProductDto) {
    const newProduct: ProductDto = { id: uuidv4(), ...createProductDto };
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const prodIndex = this.products.findIndex((item) => item.id === id);
    if (prodIndex >= 0) {
      this.products.splice(prodIndex, 1, { ...updateProductDto, id });
    }

    return this.products[prodIndex];
  }

  async delete(id: string) {
    this.products = this.products.filter((item) => item.id !== id);
    return this.products;
  }
}
