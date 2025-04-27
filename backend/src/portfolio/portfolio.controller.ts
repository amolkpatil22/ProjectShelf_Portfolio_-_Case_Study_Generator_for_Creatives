import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Request } from 'express';

@Controller('portfolios')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService) { }

    @Post()
    create(@Body() createPortfolioDto: CreatePortfolioDto, @Req() req: Request) {
        return this.portfolioService.create(createPortfolioDto, req.user);
    }

    @Get()
    findAll(@Req() req: Request) {
        return this.portfolioService.findAll(req.user);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() req: Request) {
        return this.portfolioService.findOne(id, req.user);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePortfolioDto: UpdatePortfolioDto,
        @Req() req: Request,
    ) {
        // Exclude _id and userId from being updated
        
        return this.portfolioService.update(id, updatePortfolioDto, req.user);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: Request) {
        return this.portfolioService.remove(id, req.user);
    }
}