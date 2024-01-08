import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  title: string;
  @Prop({ required: false, default: 0, type: Types.Decimal128 })
  price?: string;

  @Prop({ required: false })
  postLink?: string;

  @Prop({ required: false, default: 0 })
  variation?: number;

  @Prop({ required: false, default: 0 })
  accumulatedVariation?: number;

  @Prop({ required: false })
  historyPrice?: Array<{ price: number; date: Date }>;

  @Prop({ required: true })
  initialDate?: Date;

  @Prop({ required: false })
  lastUpdate?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
