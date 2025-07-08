import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { categories, colors, formInputsList, productList } from "./components/data";
import Modal from "./components/Modal";
import ProductCard from "./components/ui/ProductCard";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./components/interfaces";
import { productValidation } from "./components/validation";
import ErrorMessage from "./components/ui/ErrorMessage";
import CircleColor from "./components/ui/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import { name } from "./components/types";
import toast, { Toaster } from "react-hot-toast";

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
  const [errors, setErrors] = useState({title: "", description: "", src: "", price: "",})
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [products, setProducts] = useState<IProduct[]>(productList)
  const [product, setProduct] = useState<IProduct>(defaultProduct)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const OnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    setErrors( ({
      ...errors,
      [name]: "",
    }));
  }
  // Edit Product
  const [editProduct, setEditProduct] = useState<IProduct>(defaultProduct)
  const [editProductIdx, setEditProductIdx] = useState<number>(0)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const OnChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    setErrors( ({
      ...errors,
      [name]: "",
    }));
  }

  // Handler
  function open() {setIsOpen(true)}
  function close() {setIsOpen(false)}
  const openEdit = useCallback(() => {setIsOpenEdit(true)}, []);
  function closeEdit() {setIsOpenEdit(false)};
  const openConfirmModal = useCallback(() => {setIsOpenConfirmModal(true)}, []);
  function closeConfirmModal () {setIsOpenConfirmModal(false)};

  const removeProductHandler = () => {
    const filter = products.filter(product => product.id !== editProduct.id)
    setProducts(filter)
    closeConfirmModal()
    toast("Product has been deleted", {
      icon: "👌",
      style: {
        backgroundColor: "black",
        color: "white"
      }
    })
  }

  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const errors = productValidation({title: product.title, description: product.description, src: product.src, price: product.price});

    const isValid = Object.values(errors).some(e => e === "") && Object.values(errors).every(e => e === "")
    if (!isValid) {
      setErrors(errors)
      return
    }
    setErrors({title: "", description: "", src: "", price: ""})
    setProducts(prev => [{...product, id: uuid(), colors: selectedColors, category: selectedCategory}, ...prev])
    setProduct(defaultProduct)
    setSelectedColors([])
    close()
    toast("Product has been Added Successfully", {
      icon: "✅",
      style: {
        backgroundColor: "black",
        color: "white"
      }
    })
  }
  function submitEditHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const errors = productValidation({title: editProduct.title, description: editProduct.description, src: editProduct.src, price: editProduct.price});

    const isValid = Object.values(errors).some(e => e === "") && Object.values(errors).every(e => e === "")
    if (!isValid) {
      setErrors(errors)
      return
    }

    const updatedProducts = [...products]
    updatedProducts[editProductIdx] = {...editProduct, colors: selectedColors.concat(editProduct.colors)}
    setProducts(updatedProducts)

    setErrors({title: "", description: "", src: "", price: ""})
    setEditProduct(defaultProduct)
    setSelectedColors([])
    closeEdit()
    toast("Product has been Edited Successfully", {
      icon: "✅",
      style: {
        backgroundColor: "black",
        color: "white"
      }
    })
  }

  function closeHandler() {
    setErrors({title: "", description: "", src: "", price: ""})
    setProduct(defaultProduct)
    setSelectedColors([])
    close();
  }
  function closeEditHandler() {
    setErrors({title: "", description: "", src: "", price: ""})
    setEditProduct(editProduct)
    closeEdit();
  }

  // Render
  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setEditProduct={setEditProduct}
      openEdit={openEdit}
      idx={idx}
      setEditProductIdx={setEditProductIdx}
      isOpenConfirm={openConfirmModal}
    />
  ));
  const renderFormInputsList = formInputsList.map(input => (
    <div className="flex flex-col space-y-3" key={input.id}>
      <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700" >{input.label}</label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={OnChangeHandler} />
      <ErrorMessage message={errors[input.name]} />
    </div>
  ));
  const renderCircleColor = colors.map(color => <CircleColor key={color} color={color} 
    onClick={() => {
      if (selectedColors.includes(color)) {
        setSelectedColors(prev => prev.filter(item => item !== color))
        return;
      }
      if (editProduct.colors.includes(color)) {
        setEditProduct(prev => ({
          ...prev,
          colors: prev.colors.filter(item => item !== color)
        }));        
        return;
      }
      setSelectedColors((prev) => [...prev, color])
      }
    }
  />)
  const renderSelectedColors = selectedColors.map(selectedColor => <span key={selectedColor} className="p-1 mr-1 rounded-md text-sm text-white" style={{backgroundColor: selectedColor}}>{selectedColor}</span>)
  const renderEditProduct = (id: string, label: string, name: name, ) => {
    return (
      <div className="flex flex-col space-y-3">
        <label htmlFor={id} className="mb-[2px] text-sm font-medium text-gray-700" >{label}</label>
        <Input id={id} type="text" name={name} value={editProduct[name]} onChange={OnChangeEditHandler} />
        <ErrorMessage message={errors[name]} />
      </div>
    )
  }

  return (
    <main className="container mx-auto">
      <div className="text-center m-3 p-5 mb-0 pb-0">
        <Button onClick={open} className="bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer transition" width="w-fit">Add New Product</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-3 p-5 rounded-lg">
        {renderProductList}
      </div>
      {/* Add product modal */}
      <Modal isOpen={isOpen} onClose={close} title="Add A NEW PRODUCT">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputsList}
          <Select selected={selectedCategory} setSelected={setSelectedCategory} />
          <div className="flex items-center flex-wrap space-x-1 space-y-1">
            {renderSelectedColors}
          </div>
          <div className="flex items-center space-x-1 my-3">
            {renderCircleColor}
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer transition" width="w-full">Submit</Button>
            <Button type="button" onClick={closeHandler} className="bg-gray-400 hover:bg-gray-500 hover:cursor-pointer transition" width="w-full">Cancel</Button>
          </div>
        </form>
      </Modal>
      {/* Edit product modal */}
      <Modal isOpen={isOpenEdit} onClose={closeEdit} title="Edit A PRODUCT">
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderEditProduct('title', 'Product Title', 'title')}
          {renderEditProduct('description', 'Product Description', 'description')}
          {renderEditProduct('src', 'Product Image URL', 'src')}
          {renderEditProduct('price', 'Product Price', 'price')}
          <Select selected={editProduct.category} setSelected={(value) => setEditProduct({...editProduct, category: value})} />
          <div className="flex items-center flex-wrap space-x-1 space-y-1">
            {selectedColors.concat(editProduct.colors).map(selectedColor => (
              <span key={selectedColor} className="p-1 mr-1 rounded-md text-sm text-white" style={{backgroundColor: selectedColor}}>
                {selectedColor}
              </span>
              ))
            }
          </div>
          <div className="flex items-center space-x-1 my-3">
            {renderCircleColor}
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800  hover:cursor-pointer" width="w-full">Submit</Button>
            <Button type="button" onClick={closeEditHandler} className="bg-gray-400 hover:bg-gray-500 hover:cursor-pointer" width="w-full">Cancel</Button>
          </div>
        </form>
      </Modal>
      {/* DELETE PRODUCT CONFIRM MODAL */}
      <Modal isOpen={isOpenConfirmModal} onClose={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button className="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandler}>
            Yes, remove
          </Button>
          <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      </Modal>
      <Toaster />
  </main>
  );
}

export default App;