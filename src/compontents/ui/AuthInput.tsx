import { FC } from "react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const AuthInput: FC<AuthInputProps> = ({
  className = "",
  errorMessage,
  ...rest
}) => {
  return (
    <div className="w-full space-y-1">
      <input
        {...rest}
        className={`bg-white placeholder:text-neutral-400 rounded p-2 w-full focus:outline-none focus:ring-3 focus:ring-blue-400 ${className}`}
      />
      {errorMessage && <p className=" text-white">{`⚠️ ${errorMessage} ⚠️`}</p>}
    </div>
  );
};

export default AuthInput;
