import React from 'react'

function Button({
  children,
  type = 'button',
  bgColor = "bg-blue-900",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg text-center ${bgColor} ${textColor} ${className}`} {...props}
    >
      {children}
    </button>
  )
}

export default Button