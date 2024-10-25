import { productServiceApi } from '@/services/api/productService'
import { productServicePublicApi } from '@/services/api/public/productService'
import React, { useEffect, useState } from 'react'
import ListProductCardItem from '../molecules/product/list-product-card-item'
import Column from '../ui-center/column'

type Props = {}

const RecentlyViewedProductList = (props: Props) => {
  const [products, setProducts] = useState<any[]>()
  console.log("🚀 ~ RecentlyViewedProductList ~ products:", products)
  const onGetRecentlyViewedProduct = () => {
    return JSON.parse(localStorage.getItem('recentlyViewedProduct') || '[]')
  }
  const onGetProduct = async (productId: number) => {
    try {
      const res = await productServicePublicApi.getProductById(productId)
      return res.data
    } catch (error) {
      console.log("🚀 ~ onGetProduct ~ error:", error)
    }
  }

  const onGetListProduct = async (listProductId: number[]) => {
    if (!listProductId) return []
    try {
      const listProduct = await Promise.all(listProductId.map(async (productId) => {
        const product = await onGetProduct(productId)
        return product
      }))
      setProducts(listProduct.reverse())
      return listProduct
    } catch (error) {

    }
  }

  useEffect(() => {
    const listProductId = onGetRecentlyViewedProduct()
    onGetListProduct(listProductId)
  }, [])
  return (
    <div>
      {products?.length ? (
        <>
          <h1 className='text-lg font-medium mb-3'>Recently Viewed</h1>
          <Column gap={3}>
            {products?.map((product) => (
              <React.Fragment key={product.id}>
                <ListProductCardItem data={product} />
              </React.Fragment>
            ))}
          </Column>
        </>
      ) : ''}
    </div>
  )
}

export default RecentlyViewedProductList