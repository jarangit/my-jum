"use client"

import CardProduct from "@/components/ui-system/molecules/product/card-product";
import Row from "@/components/ui-system/ui-center/row";
import { likeService } from "@/services/api/likeService";
import { productServiceApi } from "@/services/api/productService";
import { StCategoryService } from "@/services/api/system/stCategory";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { openCenterModal } from "@/store/redux/slice/ui-state";
import { useCallback, useEffect, useState } from "react";

export default function CommunityTemplate() {
  const user = useAppSelector(state => state.userState.user)
  const dispatch = useAppDispatch()
  const [products, setProducts] = useState([])
  const [stCategoryList, setStCategoryList] = useState<any[]>([])
  const getProduct = async () => {
    try {
      const res = await productServiceApi.fetchProducts()
      if (res) {
        // check user if liked 
        if (user.id) {
          res.forEach((item: any) => {
            const isLiked = item.likes.find((like: any) => like.user.id === user.id)
            item.isLiked = isLiked ? true : false
          })
        }
        setProducts(res)
      }
    } catch (error) {
      console.log("🚀 ~ getProduct ~ error:", error)

    }
  }

  const onGetStCategory = async () => {
    try {
      const res = await StCategoryService.findAll()
      if (res) {
        setStCategoryList(res.data)
      }
      console.log("🚀 ~ onGetStCategory ~ res", res)
    } catch (error) {

    }
  }

  const onLike = useCallback(async (id: number) => {
    if (!products) return
    if (!user.id) {
      dispatch(openCenterModal({
        title: 'Please login to like', desc1: 'Please login to like',
        isOpen: true
      }))
      return
    }
    const foundProduct: any = products.find((item: any) => item.id === id)
    foundProduct.isLiked = !foundProduct.isLiked
    setProducts([...products])
    try {
      await likeService.toggleLikes(id)
    } catch (error) {
    }
  }, [products])

  useEffect(() => {
    getProduct()
    onGetStCategory()
    return () => { }
  }, [user])

  useEffect(() => {
    console.log('render')
  }, [onLike, products])


  return (
    <div>
      {/* category */}
      <Row className="gap-1 flex-wrap">
        {stCategoryList && stCategoryList.length > 0 && stCategoryList.map((item, key) => ((<div className="chip" key={key}>{item.name}</div>)))}
      </Row>
      <div>
        <div className="flex justify-between mb-6 items-center">
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products && products.length > 0 && products.map((item: any, key) => (
            <div key={key}>
              <CardProduct data={item}
                onLike={(id: number) => onLike(id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
