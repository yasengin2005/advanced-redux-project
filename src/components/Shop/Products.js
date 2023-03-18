import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'Sherlock Holmes',
    description: 'The first book I ever wrote',
  },
  {
    id: 'p2',
    price: 5,
    title: 'Tom Sawyer',
    description: 'The second book I ever wrote',
  },
  {
    id: 'p3',
    price: 4,
    title: 'Huckleberry Finn',
    description: 'The third book I ever wrote',
  },
  {
    id: 'p4',
    price: 3,
    title: 'The Prince and the Pauper',
    description: 'The fourth book I ever wrote',
  },
];


const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />
        ))}
      </ul>
    </section>
  );
};

export default Products;
