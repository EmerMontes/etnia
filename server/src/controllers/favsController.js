const { User, Products} = require("../db");

const getFavs = async(id)=>{

    const favorites = await User.findAll({
        where: {
            id: id,
        },include: {model: Products}
    });
    
    let filtrado = favorites[0]?.Products?.filter(cart=>{
        return cart.user_products?.isFavorite === true
    })
    return filtrado;
}

const createFav = async({UserId, ProductId})=>{
    const user =  await User.findOne({ where:{id: UserId}});

    const existingFavorite = await User.findOne({
        where: {
            id: UserId,
        },include: {model: Products, where:{id: ProductId}}
    });

    if (existingFavorite) {
        await existingFavorite.Products[0]?.user_products?.update({isFavorite: true})
        return (existingFavorite);
    }
    const newFavorite = await user.addProduct(ProductId, { through: { isFavorite: true } });
    return (newFavorite);

}

const deletefav = async({UserId, ProductId})=>{
    const fav = await User.findOne({
        where: {
            id: UserId,
        },include: {model: Products, where:{id: ProductId}}
    });

    let deleted = await fav?.Products[0]?.user_products?.update({isFavorite: false});
    return deleted;
};

module.exports = {
    createFav,
    deletefav,
    getFavs,
}