import { OrderStatus } from "@anjal_tickets/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface OrderAttrs{ //inputs

    id: string,
    version: number,
    userId: string,
    price: number,
    status: OrderStatus
}

interface OrderDoc extends mongoose.Document{ //document in mongodb

     version: number,
    userId: string,
    price: number,
    status: OrderStatus

    

}

interface OrderModel extends mongoose.Model<OrderDoc>{ // mongoose's model type
 
    build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret:any){
            ret.id = ret._id;
            delete ret._id
        }
    }
})

orderSchema.set('versionKey', 'version')
orderSchema.plugin(updateIfCurrentPlugin)

orderSchema.statics.build = (attrs: OrderAttrs) => {

    return new Order({
        _id: attrs.id,
        version: attrs.version,
        price: attrs.price,
        userId: attrs.userId,
        status: attrs.status
    })

}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema) // links all together