import {Router, Response, Request, response} from 'express';
import {ProductItem} from "../models/ProductItem";

const router: Router = Router();


// Retrieve list of all items in the Catalogue
router.get('/', async (request: Request, response: Response) => {

  console.log('Get all items.')
  const items = await ProductItem.findAndCountAll();
  response.status(200).send({
    items: items.rows
  });

});

// Retrieve a Product Item by Id
router.get('/:id', async (request: Request, response: Response) => {
  let {id} = request.params;
  console.log('Id:', id);
  const item = await ProductItem.findByPk(id);
  if(item)
    response.status(200).send(item);
  else
    response.status(404).send({
      message: 'Product with given Id not found.'
    });

});

// Delete a product item by ID
router.delete('/:id', async (request: Request, response: Response) => {

  const {id} = request.params;

  const item = await ProductItem.findByPk(id);
  if(!item)
    response.status(404).send({
      message: 'Product with given Item does not found.'
    });

  await item.destroy();
  response.status(204).send('');

});

// Update a Product Item by Id
router.patch('/:id', async (request: Request, response: Response) => {
  let {id} = request.params;
  console.log('Id:', id);

  const item = await ProductItem.findByPk(id);
  if(!item)
  {
    response.status(404).send({
      message: 'Product with given Id not found.'
    });
  }
  const name = request.body.name;
  const category = request.body.category;
  const quantity = request.body.quantity;
  const unitPrice = request.body.unitPrice;

  if(name)
    item.name = name;
  if(category)
    item.category = category;
  if(quantity)
    item.quantity = quantity
  if( unitPrice && !isNaN(parseInt(unitPrice)))
    item.unitPrice = parseInt(unitPrice);

  const saved_item = await item.save();
  response.status(200).send({
    item: saved_item
  })
});

// Create a new Product Item
router.post('/', async ( request: Request, response: Response) => {

  const name = request.body.name;
  const category = request.body.category;
  const quantity = request.body.quantity;
  const unitPrice = request.body.unitPrice;

  // Validate Request parameters
  if( !name ){
    return response.status(400).send({
      message: 'Name is a required field'
    });
  }
  if( ! quantity ){
    return response.status(400).send({
      message: 'Quantity is a required field'
    });
  }

  if( parseInt(quantity) === NaN ){
    return response.status(400).send({
      message: 'Quantity should be a valid number.'
    });
  }

  if( ! category ){
    return response.status(400).send({
      message: 'Category is a required field.'
    });
  }
  if( ! unitPrice ){
    return response.status(400).send({
      message: 'Unit Price is a required field.'
    });
  }

  if( parseInt(unitPrice) === NaN ){
    return response.status(400).send({
      message: 'Unit Price should be a valid number.'
    });
  }

  const item = await new ProductItem({
    name: name,
    category: category,
    quantity: quantity,
    unitPrice: unitPrice,
    imageUrl: null,
  });

  const saved_item = await item.save();
  saved_item.imageUrl = null;
  response.status(201).send({
    saved_item
  });


});

export const ProductRouter: Router = router;