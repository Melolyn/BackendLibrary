import { Schema, model } from 'mongoose';

const CartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
      quantity: { type: Number, default: 1 },
      isRental: { type: Boolean, default: false },
    },
  ],
});

export default model('Cart', CartSchema);
