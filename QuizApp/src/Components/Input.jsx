const Input = ({ type, value, onChange, placeholder, onKeyPress, disabled, className }) => {
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyPress={onKeyPress}
        disabled={disabled}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
    );
  };
  
  export default Input;