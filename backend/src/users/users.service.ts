import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto';
import { mapToUserResponse } from './mappers/user.mapper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        // Check if user with the same email already exists
        const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
        if (existingUser) {
            throw new ConflictException(`User with email ${createUserDto.email} already exists`);
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

        // Create user with hashed password
        const createdUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
        });

        const savedUser = await createdUser.save();
        const userResponse = mapToUserResponse(savedUser);
        if (!userResponse) {
            throw new Error('Failed to create user');
        }
        return userResponse;
    }

    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.userModel.find().exec();
        return users.map((user) => {
            const mapped = mapToUserResponse(user);
            if (!mapped) throw new Error('Failed to map user');
            return mapped;
        });
    }

    async findOne(id: string): Promise<UserResponseDto> {
        const user = await this.userModel.findById(id).exec();
        const userResponse = mapToUserResponse(user);
        if (!userResponse) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return userResponse;
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({ email }).exec();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        // If password is being updated, hash it
        if (updateUserDto.password) {
            const saltRounds = 10;
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltRounds);
        }

        const updatedUser = await this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .exec();
        const userResponse = mapToUserResponse(updatedUser);
        if (!userResponse) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return userResponse;
    }

    async remove(id: string): Promise<UserResponseDto> {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        const userResponse = mapToUserResponse(deletedUser);
        if (!userResponse) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return userResponse;
    }
} 