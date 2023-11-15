const { Reviews, User, Products, Purchases } = require('../db'); 

// para obtener todas las revisiones
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Reviews.findAll();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las revisiones.' });
  }
};

//  para crear una nueva revisión
const createReview = async (req, res) => {
  try {
    
    const { userId, productId, purchaseId, review, calification } = req.body;

   
    const userInstance = await User.findOne({ where: { id: userId } });
    const productInstance = await Products.findOne({ where: { id: productId } });
    const purchaseInstance = await Purchases.findOne({ where: { id: purchaseId } });
   
    if (!userInstance || !productInstance || !purchaseInstance) {
      return res.status(404).json({ error: 'User, product, or purchase not found.' });
    }

    const newReview = await Reviews.create({
      review,
      calification,
      userId,
      productId,
      purchaseId,
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating the review.' });
  }
};
// para obtener una revisión por su ID
const getReviewById = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Reviews.findByPk(id);
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ error: 'Revisión no encontrada.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la revisión.' });
  }
};

// actualizar una revisión por su ID
const updateReviewById = async (req, res) => {
  const { id } = req.params;
  const { review, calification } = req.body;

  try {
    const updatedReview = await Reviews.update({ review, calification }, { where: { id } });
    if (updatedReview[0]) {
      res.json({ message: 'Revisión actualizada exitosamente.' });
    } else {
      res.status(404).json({ error: 'Revisión no encontrada.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la revisión.' });
  }
};

//eliminar una revisión por su ID
const deleteReviewById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReviewCount = await Reviews.destroy({ where: { id } });
    if (deletedReviewCount) {
      res.json({ message: 'Revisión eliminada exitosamente.' });
    } else {
      res.status(404).json({ error: 'Revisión no encontrada.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la revisión.' });
  }
};

module.exports = {
  getAllReviews,
  createReview,
  getReviewById,
  updateReviewById,
  deleteReviewById,
};
