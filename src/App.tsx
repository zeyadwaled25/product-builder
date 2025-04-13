import { ChangeEvent, FormEvent, useState } from "react";
import { formInputsList, productList } from "./components/data";
import Modal from "./components/Modal";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import Input from "./components/Input";
import { IProduct } from "./components/interfaces";
import { productValidation } from "./components/validation";

const App = () => {
  const defaultProduct = {
    title: "",
    description: "",
    src: "",
    price: "",
    colors: [],
    category: {
      name: "",
      src: "",
    },
  }
  // state
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState<IProduct>(defaultProduct)
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
  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const errors = productValidation({title: product.title, description: product.description, src: product.src, price: product.price});
    console.log(errors);
  }

  function closeHandler() {
    setProduct(defaultProduct)
    close();
  }

  // Render
  const renderProductList = productList.map(product => <ProductCard key={product.id} product={product}/>);
  const renderFormInputsList = formInputsList.map(input => (
    <div className="flex flex-col space-y-3" key={input.id}>
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
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputsList}
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800" width="w-full">Submit</Button>
            <Button onClick={closeHandler} className="bg-gray-400 hover:bg-gray-500" width="w-full">Cancel</Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;