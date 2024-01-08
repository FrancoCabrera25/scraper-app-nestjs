import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProductBasket extends Document {
  @Prop()
  date: Date;

  @Prop({})
  totalPrice: number;

  @Prop()
  variation?: number;

  @Prop({ required: false })
  accumulatedVariation: number;
}

export const ProductBasketSchema = SchemaFactory.createForClass(ProductBasket);
