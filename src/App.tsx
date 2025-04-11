import { productList } from "./components/data";
import ProductCard from "./components/ProductCard";

const App = () => {
  const renderProductList = productList.map(product => <ProductCard key={product.id} product={product}/>);

  return (
    <main className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-3 p-5 rounded-lg">
        {renderProductList}
      </div>
    </main>
  );
}

export default App;