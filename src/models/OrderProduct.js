const mongoose = require("mongoose");
const orderProductSchema = new mongoose.Schema({
  orderItems: [
    {
      name: {type: String, required: true},
      image: {type: String, required: true},
      amount: {type: Number, required: true},
      price: {type: Number, required: true},
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      }
    }
  ],
  shippingAddress: {
    fullName: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    phone: {type: Number, required: true},
  },
  paymentMethod: {type: String, required: true},
  itemsPrice: {type: Number, required: true},
  shippingPrice: {type: Number, required: true},
  taxPrice: {type: Number, required: true},
  totalPrice: {type: Number, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  isPaid: {type: Boolean, default: false},
  paidedAt: {type: Date},
  isDelivered: {type: Boolean, default: false},
  deliveredAt: {type: Date}
}, {
  timestamps: true
})

const OrderProduct = mongoose.model("OrderProduct", orderProductSchema)
module.exports = OrderProduct;