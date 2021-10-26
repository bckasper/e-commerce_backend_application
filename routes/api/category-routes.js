const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categories = await Category.findAll({
      include: [{
        model: Product,
        attributes: ['id', 'product_name']
      }]
    });
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const singleCategory = await Category.findByPk(req.params.id, {
      include: [{
        model: Product,
        attributes: ['id', 'product_name']
      }]
    });

    if(!singleCategory){
      res.status(404).json({message: 'No category with that ID. Try again!'})
    }

    res.status(200).json(singleCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const newCategory = await Category.create(req.body);

    if(!newCategory){
      res.status(404).json({message: 'Please enter a valid input for a new category!'})
    }

    res.status(200).json(newCategory);
  } catch (err){
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const updatedCategory = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
      );

      if(!updatedCategory){
        res.status(404).json({message: 'There is no category with that ID. Try again!'})
      }

      res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    if(!deletedCategory){
      res.status(404).json({message: 'There is no category with that ID. Try again!'})
    }
    res.status(200).json(deletedCategory)
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
