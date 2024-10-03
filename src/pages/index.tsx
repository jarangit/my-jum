"use client"

import { productServiceApi } from "@/services/api/productService";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([])
  const getProduct = async () => {
    try {
      const res = await productServiceApi.fetchProducts()
      if (res) {
        setProducts(res)
      }
    } catch (error) {
      console.log("🚀 ~ getProduct ~ error:", error)

    }
  }

  const onCreateProduct = async () => {
    const body = {
      product: {
        "name": "dFQ1rB5Q",
        "description": "4gi1pYZ7ewKrhfNsCtMOnaYvt0zPk",
        "price": "81.40",
        "stock": 7,
      },
    }
    try {
      await productServiceApi.createProduct(body.product)
    } catch (error) {
      console.log("🚀 ~ onCreateProduct ~ error:", error)

    }
    finally {
      getProduct()
    }
  }

  const onDelete = async (id: string) => {
    try {
      await productServiceApi.deleteProduct(id)
    } catch (error) {
      console.log("🚀 ~ onDelete ~ error:", error)

    }
    finally {
      getProduct()
    }
  }

  useEffect(() => {
    getProduct()
    return () => { }
  }, [])

  return (
    <div>

      <div>
        <div className="flex justify-between mb-6 items-center">
          <div>Products</div>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {products && products.length > 0 && products.map((item: any, key) => (
            <div key={key} className="bg-bg-gray p-3 rounded-lg">
              <Link href={`/product/${item.id}`}>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
