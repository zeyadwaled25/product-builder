import { forwardRef, InputHTMLAttributes, memo, Ref } from "react";

const Input = forwardRef(({...rest}: InputHTMLAttributes<HTMLInputElement>, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      className="border-[1px] border-gray-300 shadow-md
      focus:border-indigo-500 focus:outline-none
        focus:ring-1 focus:ring-indigo-500 rounded-lg
      px-3 py-3 text-md mb-0"
      {...rest}
    />
  );
})

export default memo(Input);