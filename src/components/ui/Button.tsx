import { ButtonHTMLAttributes, memo, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: 'w-full' | 'w-fit';
}

const Button = ({children, className, width = 'w-fit', ...rest}: IProps) => {
  return (
    <button className={`${className} p-2 ${width} rounded-lg text-white uppercase`} {...rest}>
      { children }
    </button>
  );
}

export default memo(Button);