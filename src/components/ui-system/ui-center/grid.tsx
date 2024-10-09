import React from 'react'

type DivProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: number | string
  col?: number | string
}

const Grid: React.FC<DivProps> = ({ children, gap, col, className, ...props }) => {
  return (
    <div
      className={`grid  ${col ? `grid-cols-${col}` : 'grid-cols-1'}  ${gap ? `gap-${gap}` : 'gap-1'} 
      ${className ?? ''}
    `}
      {...props}
    >
      {children}
    </div>
  )
}

export default Grid