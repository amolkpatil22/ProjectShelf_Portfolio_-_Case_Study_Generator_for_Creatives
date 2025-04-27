import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PortfolioDocument = Portfolio & Document;

@Schema({ timestamps: true })
export class Portfolio {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    title: string;

    @Prop()
    bio: string;

    @Prop()
    profileImage: string;

    @Prop()
    email: string;

    @Prop()
    linkedin: string;

    @Prop()
    github: string;

    @Prop()
    website: string;

    @Prop()
    twitter: string;

    @Prop({ type: Object })
    themeSettings: {
        primaryColor?: string;
        fontFamily?: string;
        layout?: string;
    };

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({
        type: [
            {
                id: { type: String, required: true },
                title: { type: String, required: true },
                subtitle: { type: String },
                description: { type: String },
                category: { type: String },
                challenge: { type: String },
                solution: { type: String },
                outcome: { type: String },
                image: { type: String },
                images: { type: [String], default: [] },
                tools: { type: [String], default: [] },
                timeline: { type: [String], default: [] },
                videoLinks: { type: [String], default: [] },
            },
        ],
        default: [],
    })
    caseStudies: Array<{
        id: string;
        title: string;
        subtitle?: string;
        description?: string;
        category?: string;
        challenge?: string;
        solution?: string;
        outcome?: string;
        image?: string;
        images?: string[];
        tools?: string[];
        timeline?: string[];
        videoLinks?: string[];
    }>;
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);