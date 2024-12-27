import React, { useId } from 'react'

function Select({
    options = [],
    label,
    className="",
    ...props
},ref) {
    const id = useId()
  return (
    <div>
        {label && <label htmlFor={id}></label>}
        <select
        {...props}
        id={id}
        className={`px-3 py-2 rounded-lg outline-none duration-200 w-full ${className}`}
        ref={ref}
        >
            {options?.map((option)=>(
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)