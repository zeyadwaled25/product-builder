import { useState } from "react";
import { productList } from "./components/data";
import Modal from "./components/Modal";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";

const App = () => {
  // state
  let [isOpen, setIsOpen] = useState(false)

  // Handler
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  // Render
  const renderProductList = productList.map(product => <ProductCard key={product.id} product={product}/>);

  return (
    <main className="container mx-auto">
      <Button onClick={open} className="bg-indigo-700" width="w-full">Add New Product</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-3 p-5 rounded-lg">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} onClose={close}>
        <Button onClick={close} className="bg-indigo-700 hover:bg-indigo-800" width="w-full">Close</Button>
        <Button onClick={close} className="bg-gray-400 hover:bg-gray-500" width="w-full">Cancel</Button>
      </Modal>
    </main>
  );
}

export default App;