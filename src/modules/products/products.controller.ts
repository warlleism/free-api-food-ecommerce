import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ifoodItems } from '../../data/foods';

@Controller('Product')
export class ProductsController {

    @Get('products')
    async getImages(
        @Query('page') page: number = 1,
        @Query('pagesize') pagesize: number = 41,
    ) {
        try {
            const baseUrl = 'https://carolinaiv.vercel.app/images';
            const food = ifoodItems.map((item, index) => ({
                id: item.id,
                img: `${baseUrl}/${item.img}` || 'default-image-url',
                title: item.title,
                price: item.price.toFixed(2),
                discont_price: (item.price - (item.price * item.discount / 100)).toFixed(2),
                discount: `${item.discount}%`,
                category: item.category,
                enterprise: item.enterprise,
                description: item.description,
            }));

            // Convert page and pagesize to numbers to ensure proper calculation
            const pageNum = Number(page);
            const pageSizeNum = Number(pagesize);

            const totalItems = food.length;
            const totalPages = Math.ceil(totalItems / pageSizeNum);

            // Calculate start index based on page number and page size
            const startIndex = (pageNum - 1) * pageSizeNum;
            const endIndex = startIndex + pageSizeNum;
            const paginatedFood = food.slice(startIndex, endIndex);

            return {
                message: 'Images fetched successfully',
                products: paginatedFood,
                currentPage: pageNum,
                totalPages: totalPages,
                itemsPerPage: pageSizeNum,
                totalItems: totalItems,
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

    @Get('getSearch')
    async getOneProduct(
        @Query('title') title: string,
        @Query('page') page: number = 1,
        @Query('pagesize') pagesize: number = 5,
    ) {
        try {
            const baseUrl = 'https://carolinaiv.vercel.app/images';
            const food = ifoodItems.map((item, index) => ({
                id: item.id,
                img: `${baseUrl}/${item.img}` || 'default-image-url',
                title: item.title,
                price: item.price,
                discont_price: (item.price - (item.price * item.discount / 100)).toFixed(2),
                discount: `${item.discount}%`,
                category: item.category,
                enterprise: item.enterprise,
                description: item.description,
            }));

            const filteredProducts = food.filter(item => item.title.replace(/[^\w]/g, '').replace(/_/g, '').toLowerCase().includes(title.replace(/[^\w]/g, '').replace(/_/g, '').toLowerCase()));

            const pageNum = Number(page);
            const pageSizeNum = Number(pagesize);
            
            const totalItems = filteredProducts.length;
            const totalPages = Math.ceil(totalItems / pageSizeNum);

            const startIndex = (pageNum - 1) * pageSizeNum;
            const endIndex = startIndex + pageSizeNum;
            const paginatedFood = filteredProducts.slice(startIndex, endIndex);

            return {
                message: 'Product fetched successfully',
                products: paginatedFood,
                currentPage: pageNum,
                totalPages: totalPages,
                itemsPerPage: pageSizeNum,
                totalItems: totalItems,
                status: HttpStatus.OK,
            };
        } catch (error) {
            return {
                message: 'Error fetching product',
                error: error.message,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    @Get('getCategory')
    async getCategory(
        @Query('category') category: string,
        @Query('page') page: number = 1,
        @Query('pagesize') pagesize: number = 5,
    ) {
        try {
            const baseUrl = 'https://carolinaiv.vercel.app/images';
            const food = ifoodItems.map((item, index) => ({
                id: item.id,
                img: `${baseUrl}/${item.img}` || 'default-image-url',
                title: item.title,
                price: item.price,
                discont_price: (item.price - (item.price * item.discount / 100)).toFixed(2),
                discount: `${item.discount}%`,
                category: item.category,
                enterprise: item.enterprise,
                description: item.description,
            }));

            const filteredProducts = food.filter(item => item.category.normalize('NFD').replace(/[\u0300-\u036f\s]/g, '').toLowerCase() === category.normalize('NFD').replace(/[\u0300-\u036f\s]/g, '').toLowerCase());

            const pageNum = Number(page);
            const pageSizeNum = Number(pagesize);

            const totalItems = filteredProducts.length;
            const totalPages = Math.ceil(totalItems / pageSizeNum);

            const startIndex = (pageNum - 1) * pageSizeNum;
            const endIndex = startIndex + pageSizeNum;
            const paginatedFood = filteredProducts.slice(startIndex, endIndex);

            return {
                message: 'Product fetched successfully',
                products: paginatedFood,
                currentPage: pageNum,
                totalPages: totalPages,
                itemsPerPage: pageSizeNum,
                totalItems: totalItems,
                status: HttpStatus.OK,
            };
        } catch (error) {
            return {
                message: 'Error fetching product',
                error: error.message,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    @Get('getEnterprise')
    async getEnterprise(
        @Query('enterprise') enterprise: string,
        @Query('page') page: number = 1,
        @Query('pagesize') pagesize: number = 5,
    ) {
        try {
            const baseUrl = 'https://carolinaiv.vercel.app/images';
            const food = ifoodItems.map((item, index) => ({
                id: item.id,
                img: `${baseUrl}/${item.img}` || 'default-image-url',
                title: item.title,
                price: item.price,
                discont_price: (item.price - (item.price * item.discount / 100)).toFixed(2),
                discount: `${item.discount}%`,
                category: item.category,
                enterprise: item.enterprise,
                description: item.description,
            }));

            const filteredProducts = food.filter(item => item.enterprise.replace(/[^\w]/g, '').replace(/_/g, '').toLowerCase() === enterprise.replace(/[^\w]/g, '').replace(/_/g, '').toLowerCase());

            const pageNum = Number(page);
            const pageSizeNum = Number(pagesize);

            const totalItems = filteredProducts.length;
            const totalPages = Math.ceil(totalItems / pageSizeNum);

            const startIndex = (pageNum - 1) * pageSizeNum;
            const endIndex = startIndex + pageSizeNum;
            const paginatedFood = filteredProducts.slice(startIndex, endIndex);

            return {
                message: 'Product fetched successfully',
                products: paginatedFood,
                currentPage: pageNum,
                totalPages: totalPages,
                itemsPerPage: pageSizeNum,
                totalItems: totalItems,
                status: HttpStatus.OK,
            };
        } catch (error) {
            return {
                message: 'Error fetching product',
                error: error.message,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    @Get('getRecommended')
    async getRecommended() {
        try {
            const baseUrl = 'https://carolinaiv.vercel.app/images';
            const food = ifoodItems.map((item, index) => ({
                id: item.id,
                img: `${baseUrl}/${item.img}` || 'default-image-url',
                title: item.title,
                price: item.price,
                discont_price: (item.price - (item.price * item.discount / 100)).toFixed(2),
                discount: `${item.discount}%`,
                category: item.category,
                enterprise: item.enterprise,
                description: item.description,
            }));

            const filteredProducts = [];
            const includedIndices = new Set();

            while (filteredProducts.length < 10 && includedIndices.size < food.length) {
                const randomIndex = Math.floor(Math.random() * food.length);
                if (!includedIndices.has(randomIndex)) {
                    filteredProducts.push(food[randomIndex]);
                    includedIndices.add(randomIndex);
                }
            }

            return {
                message: 'Product fetched successfully',
                products: filteredProducts,
                status: HttpStatus.OK,
            };
        } catch (error) {
            return {
                message: 'Error fetching product',
                error: error.message,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

    @Get('getOne')
    async getOne(
        @Query('id') id: number) {
        try {
            const baseUrl = 'https://carolinaiv.vercel.app/images';
            const food = ifoodItems.map((item, index) => ({
                id: item.id,
                img: `${baseUrl}/${item.img}` || 'default-image-url',
                title: item.title,
                price: item.price,
                discont_price: (item.price - (item.price * item.discount / 100)).toFixed(2),
                discount: `${item.discount}%`,
                category: item.category,
                enterprise: item.enterprise,
                description: item.description,
            }));

            const filteredProducts = food.filter(item => item.id == id);

            return {
                message: 'Product fetched successfully',
                filteredProducts,
                status: HttpStatus.OK,
            };
        } catch (error) {
            return {
                message: 'Error fetching product',
                error: error.message,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }

}