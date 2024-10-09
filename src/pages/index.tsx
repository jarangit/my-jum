"use client"

import CardProduct from "@/components/product/card-product";
import { likeService } from "@/services/api/likeService";
import { productServiceApi } from "@/services/api/productService";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { openCenterModal } from "@/store/redux/slice/ui-state";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Home() {
  const user = useAppSelector(state => state.userState.user)
  const dispatch = useAppDispatch()
  const [products, setProducts] = useState([])
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
    return () => { }
  }, [user])

  useEffect(() => {
    console.log('render')
  }, [onLike, products])


  return (
    <div>

      <div>
        <div className="flex justify-between mb-6 items-center">
          <div>Products</div>
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products && products.length > 0 && products.map((item: any, key) => (
            <div key={key}>
              <CardProduct data={item}
                onLike={(id: number) => onLike(id)}
              />
              {/* <Link href={`/product/${item.id}`}>
                <div className="flex justify-between">
                  <div>{item.name}</div>
                  <div>{item.price}</div>
                </div>
                <div className="text-gray">
                  <Link href={`/profile/${item?.user?.id}`}>
                    {item?.user?.username}
                  </Link>
                </div>

              </Link>
              {/* like */}
              {/* <div className="flex gap-1 items-center justify-end mt-auto" >
                <FaHeart className={`${item.isLiked ? "text-red" : ""} cursor-pointer`} onClick={() => onLike(item.id)} />
                <div className={`${item.totalLikes ? '' : 'hidden'}`}> {item.totalLikes}</div>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
