import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CaseStudyDocument = CaseStudy & Document;

@Schema({ timestamps: true })
export class CaseStudy {
    @Prop({ required: true })
    title: string;

    @Prop()
    subtitle: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: String })
    challenge: string;

    @Prop({ type: String })
    solution: string;

    @Prop({ type: String })
    results: string;

    @Prop()
    role: string;

    @Prop()
    duration: string;

    @Prop()
    teamSize: string;

    @Prop({ type: [String], default: [] })
    technologies: string[];

    @Prop({ type: [String], default: [] })
    images: string[];

    @Prop({ type: Types.ObjectId, ref: 'Portfolio', required: true })
    portfolioId: Types.ObjectId;
}

export const CaseStudySchema = SchemaFactory.createForClass(CaseStudy); 