import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProductsBasket extends Document {
  @Prop()
  fecha: Date;

  @Prop()
  precioTotal: number;

  @Prop()
  variation: string;

  @Prop({ required: false, enum: ['POSITIVE', 'NEGATIVE', 'EQUAL'] })
  variationType: string;
}
