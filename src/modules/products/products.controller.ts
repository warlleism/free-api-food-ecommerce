import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ifoodItems } from '../../foods';

@Controller('Product')
export class ProductsController {
    @Get('images')
    async getImages(
        @Query('page') page: number = 1,
        @Query('pagesize') pageSize: number = 10,
    ) {
        try {
            const imagesDir = path.resolve(__dirname, '../../../src/images');
            const baseUrl = 'https://free-api-food-ecommerce.vercel.app/images';

            const files = fs.readdirSync(imagesDir).filter((file) => file.endsWith('.png'));

            const images = files.map((file) => ({
                img: `${baseUrl}/${file}`,
            }));

            const food = ifoodItems.map((item, index) => ({
                img: images[index]?.img || 'default-image-url',
                name: item.name,
                enterprise: item.enterprise,
                description: item.description,
            }));

            const startIndex = (page - 1) * pageSize;
            const paginatedFood = food.slice(startIndex, startIndex + pageSize);

            return {
                message: 'Images fetched successfully',
                images: paginatedFood,
                status: HttpStatus.OK,
            };
        } catch (error) {
            return {
                message: 'Error fetching images',
                error: error.message,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
}