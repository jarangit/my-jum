
"user client"
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { userService } from '@/services/api/public/userService'
import ProductDetailTemplate from '@/components/ui-system/templates/product-detail-template'
import { productService } from '@/services/api/public/productService'
type Props = {}

const ProductPage = (props: Props) => {
  const { query } = useRouter()
  const [product, setProduct] = useState<any>()
  const [ownerProduct, setOwnerProduct] = useState<any>()

  const onGetProduct = useCallback(async (id: number) => {
    try {
      const res = await productService.getProductById(id)
      if (res && res.data) {
        setProduct(res.data)
        if (res.data.user) {
          onGetProductByOwner(res.data.user.id)
        }
      }
    } catch (error) {
    }
  }, [query])

  const onGetProductByOwner = useCallback(async (id: number) => {
    try {
      const res: any = await productService.getProductByUserId(id)
      if (res && res.data) {
        setOwnerProduct(res.data)
      }
    } catch (error) {
    }
  }, [query])

  useEffect(() => {
    if (query.id) {
      onGetProduct(+query.id)
    }
  }, [query])

  return (
    <div>
      <ProductDetailTemplate product={product} ownerProduct={ownerProduct} />
    </div>
  )
}

export default ProductPage