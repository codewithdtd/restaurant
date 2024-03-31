const UserService = require("../services/user.service");
const CartService = require("../services/cart.service")
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const jwt = require('jsonwebtoken');


const generateAccessToken = require("../middleware/generateAccessToken")
const generateRefreshToken = require("../middleware/generateRefreshToken");
const OrderService = require("../services/order.service");
const MenuService = require("../services/menu.service")
require('dotenv').config()

exports.create = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.create(req.body);
        return res.send(document);
    } catch (error) { 
        return next(
            new ApiError(500, "Đã có lỗi xảy ra trong quá trình tạo tài khoản") 
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const userService = new UserService(MongoDB.client);
        const queryParams = req.query;
        if (Object.keys(queryParams).length > 0) {
            documents = await userService.findByQuery(queryParams);
        } else {
            documents = await userService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "Đã có lỗi xảy ra")
        ); 
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "user not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving user with id=${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "user not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving user with id=${req.params.id}`)
        );
    }
}


exports.delete = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "user not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500, 
                `Không thể xóa id=${req.params.id}`
            )
        );
    }
}


exports.deleteAll = async (_req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const deletedCount = await userService.deleteAll();
        return res.send({
            message: `${deletedCount} users were delete successfully`,
        })
    } catch (error) {
        return next (
            new ApiError(
                500, "Đã có lỗi xảy ra!"
            )
        )
    }
}

exports.login = async (req, res, next) => {
    try {
        const data = req.body;
        const userService = new UserService(MongoDB.client);
        const user = await userService.findUserLogin({ phone: data.phone });
    
        if(!user) {
            return next(new ApiError(404, "user not found"));
        }
        
        if(data.password !== user.password) {
            return res.send({
                message: `Sai mật khẩu`,
            })
        }
        if(user) {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            })

            res.cookie("token", accessToken, {
                // httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            })

            const {password, ...orther} = user;
            return res.json({accessToken: accessToken, ...orther});
        }
        // return res.send({
        //     user
        // })
    }catch(err) {
        return next (
            new ApiError(
                500, "Đã có lỗi xảy ra!"
            )
        )
    }
}

exports.logout = async  (req, res, next) => {
    res.clearCookie("refreshToken");
    res.clearCookie("token");
    return res.json({message: "Logged out!"})
}


exports.refreshToken = async (req, res, next) => {
    const refreshToken = req.cookies?.refreshToken;

    if(!refreshToken) {
        return next( new ApiError(403, "You're not authenticated"));
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=> {
        console.log(user)
        if(err) {
            console.log(err);
        }
        // tạo access token mới
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
        })
        return res.json(newAccessToken);
    })
}

// CART
exports.addCart = async (req,res,next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const cartService = new CartService(MongoDB.client);
        const menuService = new MenuService(MongoDB.client);

        const data = req.body;
        const id = req.user.user._id;

        const cartItems = [];
        const cartItem = {
            product: data,
            quanlity: !data.quanlity ? 1 : data.quanlity,
            price: data.price,
        };
        // Kiểm tra số lượng trong kho
        const countProduct = await menuService.findById(data._id)

        const findCart = await cartService.find(id, data._id)
        
        if(countProduct.quanlity >= cartItem.quanlity && !findCart ){
            countProduct.quanlity = countProduct.quanlity - cartItem.quanlity;

            cartItems.push(cartItem)
            const addCart = await userService.addCart(id, cartItems);

            const updateMenu = await menuService.update(cartItem.product._id,countProduct)

            const addtoCart = await cartService.create(id, cartItem);
            return res.send({addtocart: addtoCart});
        }
        else if(findCart && countProduct.quanlity >= cartItem.quanlity) {
            countProduct.quanlity = countProduct.quanlity - cartItem.quanlity;
            findCart.quanlity+=cartItem.quanlity;
            const total = cartItem.price*cartItem.quanlity+findCart.price;
            findCart.price = total;
            // cartItems.push(cartItem)

            const updateMenu = await menuService.update(cartItem.product._id,countProduct)
            const addtoCart = await cartService.updateQuanlity(findCart);
        
            const carts = await cartService.findAllCartUser(id)

            const newCarts = carts.map(({ user, ...rest}) => rest);
            const clearCart = await userService.deleteAllCart(id)
            const updateCartUser = await userService.updateCart(id,newCarts) 

            return res.send(addtoCart);
        }
        return res.json({message: "Quá số lượng"});

    } catch(err) {
        return next( new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}

exports.findAllCartUser = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const carts = await cartService.findAllCartUser(req.user.user._id)
        return res.json(carts)
    } catch (error) {
        return next( new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}

exports.updateCart = async (req, res, next) => {
    try {
        const cart = req.body;
        const user = req.user.user._id;

        const cartService = new CartService(MongoDB.client);
        const userService = new UserService(MongoDB.client);
        const menuService = new MenuService(MongoDB.client)
   
        //Check số lượng sản phẩm trong kho
        const countProduct = await menuService.findById(cart.product._id)

        const item = await cartService.findById(cart._id);
        
        if(countProduct.quanlity >= (cart.quanlity - item.quanlity)){
            if(cart.quanlity > item.quanlity)
                countProduct.quanlity = countProduct.quanlity - (cart.quanlity - item.quanlity);
            else 
                countProduct.quanlity = countProduct.quanlity + (item.quanlity - cart.quanlity)
            console.log(countProduct.quanlity)


            const updateCart = await cartService.update(cart._id,cart)
            const carts = await cartService.findAllCartUser(user)

            const updateMenu = await menuService.update(cart.product._id,countProduct)
            // console.log(updateMenu)


            const newCarts = carts.map(({ user, ...rest}) => rest);
            const clearCart = await userService.deleteAllCart(user)
            const updateCartUser = await userService.updateCart(user,newCarts) 

            return res.json(updateCartUser)
        }
        else 
            return res.json({message: "Quá số lượng"})
    } catch (error) {
        // console.log(error)
        return next(new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}

exports.deleteCart = async (req, res, next) => {
    try {
        const cart_id = req.params.id;
        const user = req.user.user._id;


        const cartService = new CartService(MongoDB.client);
        const userService = new UserService(MongoDB.client);
        const menuService = new MenuService(MongoDB.client)

        const cart = await cartService.findById(cart_id)
        const product = await menuService.findById(cart.product._id)
        // update menu 
 
        cart.quanlity = cart.quanlity + product.quanlity;

        const countProduct = await menuService.update(cart.product._id, {quanlity: cart.quanlity} )


        const deleteCart = await cartService.delete(cart._id);
        const deleteCartUser = await userService.deleteCart(user, cart._id)

        return res.json(deleteCartUser);
    } catch (error) {
        return next( new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}

exports.addOrder = async (req, res, next) => {
    try {
        const order = req.body;
        const user = req.user.user._id;

        order.userId = user;
        // const userService =  new UserService(MongoDB.client);
        const cartService = new CartService(MongoDB.client);
        const orderService = new OrderService(MongoDB.client);

        // const carts = await cartService.findAllCartUser(user);
        // const newCarts = carts.map(({ user, _id,...rest}) => rest);
        // order.detail = newCarts;

        // let totalPrice = 0;
        // order.detail.forEach(item => { totalPrice+=item.price });
        // order.totalPrice = totalPrice;

        // Create order
        const addOrder = await orderService.create(order);
        await cartService.deleteAllCartUser(user);
        return res.json(addOrder);
    } catch (error) {
        console.log(error)
        return next( new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}

exports.updateOrder = async (req, res, next) => {
    try {
        const order = req.body;
        const orderService = new OrderService(MongoDB.client);

        const updateOrder = await orderService.update(order._id,order)
        return res.json(updateOrder)
    } catch (error) {
        console.log(error)
        return next( new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}

exports.findAllOrderUser = async (req, res, next) => {
    try {
        const userId = req.user.user._id;
        const orderService = new OrderService(MongoDB.client);

        const AllOrder = await orderService.findAllOrderUser(userId)
        return res.json(AllOrder)
    } catch (error) {
        console.log(error)
        return next( new ApiError(
            500, "Đã có lỗi xảy ra!"
        ))
    }
}