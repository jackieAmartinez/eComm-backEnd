const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]})
    .then((results) => res.json(results))
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product]
  })
  .then((result) => res.json(result))
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newCategory) => res.status(200).json(newCategory))
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update({
      category_name: req.body.categoryName
    },
    {
      where: {
        id: req.params.id
      }
    });
    // sends message if user requests to update ID that does not exist
    const categoryById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoryById) {
      res.status(200).json({message: 'No categories found'});
      return;
    };

    res.status(200).json(updateCategory);
    console.log("Category updated!");

  } catch (err) {
    res.status(500).json(err);
  };
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy(
      {
        where: {
          id: req.params.id,
        }
      });

      if (!deleteCategory) {
        res.status(200).json({message: 'No categories found'});
        return;
      };

      res.status(200).json(deleteCategory);
      console.log('Category deleted!');

  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;