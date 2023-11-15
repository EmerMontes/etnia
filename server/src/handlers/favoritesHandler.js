const {getFavs, createFav, deletefav} = require("../controllers/favsController");

const getAllFavorites = async (req, res)=>{
    const {id} = req.params;
    try {
        if(!id){return res.status(404).json("Missing data")};

        let favorites = await getFavs(id);
        res.json(favorites);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const postFavorite = async (req, res)=>{
    const {UserId, ProductId} = req.body
    try {
        if(!UserId || !ProductId){return res.status(404).json("Missing data")};

        let favorite = await createFav({UserId, ProductId});
        if(!favorite){return res.status(403).json({message: "Error to createFavorite"})}

        let favorites = await getFavs(UserId);
        res.json(favorites);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteFavorite = async (req, res)=>{
    const {UserId, ProductId} = req.body;
    try {
        if(!UserId || !ProductId){return res.status(404).json("Missing data")};

        let favorite = await deletefav({UserId, ProductId});
        if(!favorite){return res.json({message: "This not a favorite"})}

        let favorites = await getFavs(UserId);
        res.json(favorites);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getAllFavorites,
    postFavorite,
    deleteFavorite
}