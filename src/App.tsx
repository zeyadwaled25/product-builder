import { ChangeEvent, useState } from "react";
import { formInputsList, productList } from "./components/data";
import Modal from "./components/Modal";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import Input from "./components/Input";
import { IProduct } from "./components/interfaces";

const App = () => {
  // state
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState<IProduct>({
    id: "",
    title: "",
    description: "",
    src: "",
    price: "",
    colors: [],
    category: {
      name: "",
      src: "",
    },
  })
  const OnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  }

  // Handler
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  // Render
  const renderProductList = productList.map(product => <ProductCard key={product.id} product={product}/>);
  const renderFormInputsList = formInputsList.map(input => (
    <div className="flex flex-col space-y-3">
      <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700" >{input.label}</label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={OnChangeHandler} />
    </div>
  ));

  return (
    <main className="container mx-auto">
      <Button onClick={open} className="bg-indigo-700" width="w-full">Add New Product</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-3 p-5 rounded-lg">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} onClose={close} title="Add A NEW PRODUCT">
        <div className="space-y-3">
          {renderFormInputsList}
          <div className="flex items-center space-x-3">
            <Button onClick={close} className="bg-indigo-700 hover:bg-indigo-800" width="w-full">Submit</Button>
            <Button onClick={close} className="bg-gray-400 hover:bg-gray-500" width="w-full">Cancel</Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}

export default App;