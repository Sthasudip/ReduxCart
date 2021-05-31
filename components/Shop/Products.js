import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "m1",
    title: "my 1st book",
    price: 6,
    description: "My life experience",
  },
  {
    id: "m2",
    title: "my 2st book",
    price: 6,
    description: "My life experience part 2",
  },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            id={product.id}
            key={product.id}
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
