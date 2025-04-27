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

    @Prop({ type: [{ type: Types.ObjectId, ref: 'CaseStudy' }], default: [] })
    caseStudies: Types.ObjectId[];
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio); 