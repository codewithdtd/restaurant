const { ObjectId } = require("mongodb");
class CartService {
    constructor(client) {
        this.Cart = client.db().collection("carts");
    }
// Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    infocart(payload) {
        const cart = {
            user: payload.user,
            product: payload.product,
            quanlity: payload.quanlity,
            price: payload.quanlity*payload.product.price        
        };
        // Remove undefined fields
        Object.keys(cart).forEach(
            (key) => {
                cart[key] === undefined && delete cart[key]
            }
        );
        return cart;
    }
    async create(user, payload) {
        const cart = this.infocart(payload);
        if(cart.quanlity > 0) {
            const result = await this.Cart.findOneAndUpdate(
                cart,
                { $set: {
                    user: user,
                    price: payload.quanlity*payload.product.price
                    }
                },
                { returnDocument: "after", upsert: true }
            );
            return result;
        }
        return false;
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.infocart(payload);
        if(update.quanlity >= 0)  { 
            const result = await this.Cart.findOneAndUpdate(
                filter,
                { $set: update },
                { returnDocument: "after" }
            );
            return result;
        }
        return false;
    }




    async updateQuanlity(cart) {
        const filter = {
            _id: ObjectId.isValid(cart._id) ? new ObjectId(cart._id) : null,
        };
        const result = await this.Cart.findOneAndUpdate(
            filter,
            { $set: {"quanlity": cart.quanlity, price: cart.price*cart.quanlity } },
            { returnDocument: "after" }
        );
        return result;
    }
    async find(user, id) {
        const result = await this.Cart.findOne({ 'product._id': { $eq: id }, user: user });
        return result;
    }

    async findById(id) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const result = await this.Cart.findOne(filter);
        return result ?? false;
    }

    async findAllCartUser(id) {
        const filter = {
            user: id,
        };
        const result = await this.Cart.find(filter);
        return result.toArray();
    }

    async delete(id) {
        const result = await this.Cart.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Cart.deleteMany({});
        return result.deletedCount;
    }

}



module.exports = CartService;