const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tags = await Tag.findAll({
      include: [{
        model: Product,
      }]
    });
    res.status(200).json(tags)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
      }]
    });

    if(!singleTag){
      res.status(404).json({message: 'No tag with that ID. Try again!'})
    }

    res.status(200).json(singleTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create(req.body);

    if(!newTag){
      res.status(404).json({message: 'Please enter a valid input for a new tag!'})
    }

    res.status(200).json(newTag);
  } catch (err){
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updatedTag = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
      );

      if(!updatedTag){
        res.status(404).json({message: 'There is no tag with that ID. Try again!'})
      }

      res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    if(!deletedTag){
      res.status(404).json({message: 'There is no tag with that ID. Try again!'})
    }
    res.status(200).json(deletedTag)
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
