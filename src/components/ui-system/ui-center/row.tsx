import React from 'react'

type DivProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: number | string
}

const Row: React.FC<DivProps> = ({ children, gap, className, ...props }) => {
  return (
    <div
      className={`flex flex-row items-center 
      ${className ?? ''}
      ${gap ? `gap-${gap}` : 'gap-1'}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default Row