
"user client"
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { userService } from '@/services/api/public/userService'
import { productService } from '@/services/api/public/productService'
type Props = {}

const ProductPage = (props: Props) => {
  const { query } = useRouter()
  const [product, setProduct] = useState<any>()

  const onGetProduct = useCallback(async (id: number) => {
    try {
      const res = await productService.getProductById(id)
      if (res && res.data) {
        setProduct(res.data)
      }
    } catch (error) {
      console.log("🚀 ~ onGetProduct ~ error:", error)
    }
  }, [query])

  useEffect(() => {
    if (query.id) {
      onGetProduct(+query.id)
    }
  }, [query])

  return (
    <div>
      <h1>Profile</h1>
      <div>{product?.name}</div>
      <div>{product?.price}</div>
    </div>
  )
}

export default ProductPage