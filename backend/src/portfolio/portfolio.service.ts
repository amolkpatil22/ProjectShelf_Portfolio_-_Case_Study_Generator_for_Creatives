import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Portfolio, PortfolioDocument } from './entities/portfolio.entity';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Injectable()
export class PortfolioService {
    constructor(
        @InjectModel(Portfolio.name)
        private portfolioModel: Model<PortfolioDocument>,
    ) { }

    async create(createPortfolioDto: CreatePortfolioDto, user: any) {
        const portfolio = new this.portfolioModel({
            ...createPortfolioDto,
            userId: user.sub,
        });
        return await portfolio.save();
    }

    async findAll(user: any) {
        return await this.portfolioModel.find({ userId: user.sub }).exec();
    }

    async findOne(id: string, user: any) {
        const portfolio = await this.portfolioModel
            .findOne({ _id: id, userId: user.sub })
            .exec();

        if (!portfolio) {
            throw new NotFoundException(`Portfolio with ID ${id} not found`);
        }

        return portfolio;
    }

    async update(id: string, updatePortfolioDto: UpdatePortfolioDto, user: any) {
        const portfolio = await this.findOne(id, user);
        Object.assign(portfolio, updatePortfolioDto);
        return await portfolio.save();
    }

    async remove(id: string, user: any) {
        const portfolio = await this.findOne(id, user);
        await portfolio.deleteOne();
        return { message: 'Portfolio deleted successfully' };
    }
} 