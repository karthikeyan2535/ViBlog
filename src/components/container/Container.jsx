import React from 'react'

function Container({children,theme}) {
  return <div className={theme==='light'?" w-full  mx-auto px-4" :" w-full mx-auto px-4"}>{children}</div>;
  
}

export default Container