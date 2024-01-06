import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  title: string;
  @Prop({ required: false })
  price?: number;

  @Prop({ required: false })
  postLink?: string;

  @Prop({ required: false })
  variation?: number;

  @Prop({ required: false, enum: ['POSITIVE', 'NEGATIVE', 'EQUAL'] })
  variationType?: string;

  @Prop({ required: false })
  historyPrice?: [SchemaMongoose.Types.Mixed];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
