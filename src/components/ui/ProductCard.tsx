import Image from "../Image";
import { IProduct } from "../interfaces";
import Button from "../ui/Button";
import { txtSlicer } from "../utils/function";
import CircleColor from "./CircleColor";

interface IProps {
  product: IProduct;
  setEditProduct: (product: IProduct) => void;
  openEdit: () => void;
  idx: number;
  setEditProductIdx: (idx: number) => void
  isOpenConfirm: () => void;
}

const ProductCard = ({product, setEditProduct, openEdit, idx, setEditProductIdx, isOpenConfirm}: IProps) => {

  const renderCircleColor = product.colors.map(color => <CircleColor key={color} color={color}/>)
  const onEdit = () => {
    setEditProduct(product)
    openEdit()
    setEditProductIdx(idx)
  }
  const handleDeleteClick = () => {
    setEditProduct(product);
    isOpenConfirm();
  }

  return (
    <div className="border border-gray-500 max-w-sm md:max-w-lg mx-auto md:mx-0 rounded-md p-2 flex flex-col">
      <div className="image h-full">
        <Image  src={product.src}
                alt="BMW"
                className="rounded-md mb-2" />
      </div>
      <div className="details">
        <h3 className="title">{product.title}</h3>
        <p className="description">{txtSlicer(product.description)}</p>
      </div>
      <div className="flex items-center space-x-1 my-3">
        {renderCircleColor}
      </div>
      <div className="price flex items-center justify-between">
        <span>${product.price.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        <div className="flex items-center space-x-1">
          <span>{product.category.name}</span>
          <Image  src={product.category.src}
                  alt={product.category.name}
                  className="w-10 h-10 rounded-full object-center" />
        </div>
      </div>
      <div className="buttons flex items-center justify-between space-x-3 mt-4 mb-1">
        <Button className="bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer transition" width="w-full" onClick={onEdit}>Edit</Button>
        <Button onClick={handleDeleteClick} className="bg-rose-700 hover:bg-rose-800 hover:cursor-pointer transition" width="w-full">Delete</Button>
      </div>
    </div>
  );
}

export default ProductCard;