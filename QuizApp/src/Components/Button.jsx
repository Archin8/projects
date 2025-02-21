const Button = ({ children, onClick, disabled, variant, className }) => {
    const baseStyles = "px-4 py-2 rounded-md transition-colors";
    const variantStyles = variant === "outline" 
      ? "border border-gray-300 hover:bg-gray-50" 
      : "bg-blue-600 text-white hover:bg-blue-700";
    
    return (
      <button 
        onClick={onClick} 
        disabled={disabled}
        className={`${baseStyles} ${variantStyles} ${className || ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;