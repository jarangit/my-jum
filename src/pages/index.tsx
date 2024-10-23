"use client"

import ModalContent from "@/components/ui-system/molecules/modals/products/modal-content";
import CardProduct from "@/components/ui-system/molecules/product/card-product";
import Row from "@/components/ui-system/ui-center/row";
import { likeService } from "@/services/api/likeService";
import { productServiceApi } from "@/services/api/productService";
import { StCategoryService } from "@/services/api/system/stCategory";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { openCenterModal } from "@/store/redux/slice/ui-state";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const mockDataProduct = {
  "id": 7,
  "name": "The Brave Wanderer",
  "thumbnail": "https://img.freepik.com/free-vector/golf-course-background-hand-drawn-style_23-2147768692.jpg?t=st=1728354730~exp=1728358330~hmac=adc06cb30753c732b32a501c3fea5156d3d48ce98f114a672b38cd14b36199cb&w=1380",
  "description": "การวาดภาพทะเลทำให้ฉันรู้สึกถึงความสงบและอิสระของธรรมชาติ เส้นขอบฟ้าที่เชื่อมต่อระหว่างน้ำและฟ้าสะท้อนถึงความไม่มีที่สิ้นสุดของจินตนาการ เสียงคลื่นที่กระทบฝั่งช่วยให้ฉันปล่อยความคิดและเติมพลังสร้างสรรค์ในทุกลายเส้น",
  "price": "12.00",
  "stock": 2,
  "createdAt": "2024-10-07T20:38:06.702Z",
  "user": {
    "id": 10,
    "username": "Jaran",
    "profileImage": "https://img.freepik.com/free-photo/young-man-travelling-by-city-bus_23-2148958101.jpg?t=st=1728359039~exp=1728362639~hmac=0a11e9c7b7b3dc83c0a08a093203a58e491be406447ae5eba40d9529a5e04257&w=1380",
    "email": "my@email.com"
  },
  "likes": [],
  "totalLikes": 0
}

export default function Home() {
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
