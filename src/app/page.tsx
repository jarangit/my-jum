"use client"

import Image from "next/image";
import Link from "next/link";
import { createProduct, deleteProduct, fetchProducts } from "./services/api/productService";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([])
  const getProduct = async () => {
    try {
      const res = await fetchProducts()
      if (res) {
        setProducts(res)
      }
    } catch (error) {
      console.log("🚀 ~ getProduct ~ error:", error)

    }
  }

  const onCreateProduct = async () => {
    const body = {
      "name": "dFQ1rB5Q",
      "description": "4gi1pYZ7ewKrhfNsCtMOnaYvt0zPk",
      "price": "81.40",
      "stock": 7
    }
    try {
      await createProduct(body)
    } catch (error) {

    }
    finally {
      getProduct()
    }
  }

  const onDelete = async (id: string) => {
    try {
      await deleteProduct(id)
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
          <button onClick={() => onCreateProduct()}>Crate</button>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {products && products.length > 0 && products.map((item: any, key) => (
            <div key={key} className="bg-gray-200 p-3 rounded-lg">
              <div className="flex justify-between">
                <div>{item.name}</div>
                <div>{item.price}</div>
              </div>
              <button onClick={() => onDelete(item.id)} >Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
