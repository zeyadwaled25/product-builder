interface IProps {
  message: string;
}

const ErrorMessage = ({message}: IProps) => {
  return (
    message ? <span className="block text-red-700 font-semibold text-sm">{message}</span> : null
  );
}

export default ErrorMessage;