import Image from "../Image";
import { IProduct } from "../interfaces";
import Button from "../ui/Button";
import { txtSlicer } from "../utils/function";

interface IProps {
  product: IProduct;
}

const ProductCard = ({product}: IProps) => {
  return (
    <div className="border max-w-sm md:max-w-lg mx-auto md:mx-0 rounded-md p-2 flex flex-col">
      <div className="image">
        <Image  src={product.src}
                alt="BMW"
                className="rounded-md mb-2" />
      </div>
      <div className="details">
        <h3 className="title">{product.title}</h3>
        <p className="description">{txtSlicer(product.description)}</p>
      </div>
      <div className="flex items-center space-x-2 my-3">
        {product.colors.map((clr, idx) => (
          <span key={idx} className={`w-5 h-5 rounded-full cursor-pointer`} style={{ backgroundColor: clr }} />
        ))}
      </div>
      <div className="price flex items-center justify-between">
        <span>${product.price}</span>
        <Image  src={product.category.src}
                alt="BMW"
                className="w-10 h-10 rounded-full object-center" />
      </div>
      <div className="buttons flex items-center justify-between space-x-3 my-4">
        <Button className="bg-indigo-700" width="w-full">Edit</Button>
        <Button className="bg-red-700" width="w-full">Delete</Button>
      </div>
    </div>
  );
}

export default ProductCard;