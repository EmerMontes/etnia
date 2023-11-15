const { User, Products} = require("../db");

const getCarts = async (id)=>{
    const carts = await User.findAll({
        where: {
            id: id,
        },include: {model: Products}
    });
    
    let filtrado = carts[0]?.Products?.filter(cart=>{
        return cart.user_products?.isCart === true
    })
    return filtrado;
};

const createCart = async ({UserId, ProductId})=>{
    const cart = await User.findOne({ where:{id: UserId}});

    const existingCart = await User.findOne({
        where: {
            id: UserId,
        },include: {model: Products, where:{id: ProductId}}
    });

    if (existingCart) {
        await existingCart.Products[0]?.user_products?.update({isCart: true})
        return (existingCart);
    }
    const newCart = await cart.addProduct(ProductId, { through: { isCart: true } });
    return (newCart);
}
const deleteFromCart = async ({UserId, ProductId})=>{
    const cart = await User.findOne({
        where: {
            id: UserId,
        },include: {model: Products, where:{id: ProductId}}
    });

    let deleted = await cart?.Products[0]?.user_products?.update({isCart: false});
    return deleted;
};

module.exports = {
    getCarts,
    createCart,
    deleteFromCart,
}
