import React from 'react'
import { ProductCarousel } from './Carousel'

const Latest = () => {
  return (
    <div className='bg-white '>
          
           <div className='max-w-7xl mx-auto py-10'>
             <div className='text-xl font-bold px-2'>Latest Collections</div>
            <ProductCarousel/>
           </div>
        
    </div>
 
   
  )
}

export default Latest