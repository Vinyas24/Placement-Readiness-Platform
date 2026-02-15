import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variantClass = `btn-${variant}`;
  
  // Allow overriding styles via style prop if needed (like for the Error button color)
  return (
    <button 
      className={`btn ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
