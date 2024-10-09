import React from 'react'

type DivProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: number | string
}
const Column: React.FC<DivProps> = ({ children, gap, className, ...props }) => {
  return (
    <div
      className={`flex flex-col
      ${className ?? ''}
    ${gap ? `gap-${gap}` : 'gap-1'}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default Column