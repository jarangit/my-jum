import CardProduct from '@/components/ui-system/molecules/product/card-product'
import Table from '@/components/ui-system/molecules/table'
import Column from '@/components/ui-system/ui-center/column'
import Row from '@/components/ui-system/ui-center/row'
import { productServiceApi } from '@/services/api/productService'
import { useAppSelector } from '@/store/hook'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { CiGrid41 } from 'react-icons/ci'
import { FaList } from 'react-icons/fa'
import { IoGrid } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'

type Props = {}

const ProductPage = (props: Props) => {
  const user = useAppSelector(state => state.userState.user)
  const { push, pathname } = useRouter()
  const [products, setProducts] = useState([])
  const [currentDisplayDataType, setCurrentDisplayDataType] = useState<'list' | 'grid'>('list')
  // function zone 
  const onGetProducts = useCallback(async (id: number) => {
    try {
      const res = await productServiceApi.getProductByUserId(id)
      if (res) {
        setProducts(res.data)
      }
    } catch (error) {

    }
  }, [])

  const onDelete = async (id: string) => {
    try {
      await productServiceApi.deleteProduct(id)
      onGetProducts(user.id as number)
    } catch (error) {
      console.log("🚀 ~ onDelete ~ error:", error)

    }
    finally {
      if (user.id) {
        onGetProducts(user.id)
      }
    }
  }

  const data = React.useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'React',
        col2: 'Table',
      },
      {
        col1: 'Library',
        col2: 'is great!',
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'no',
        Cell: ({ row }: any) => <div>{row.index + 1}</div>,
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Thumbnail',
        accessor: 'thumbnail',
        Cell: ({ value }: any) => <img src={value} alt="thumbnail" className='w-12 h-12 rounded-sm mx-auto' />,
      },
      {
        Header: 'Description',
        accessor: 'description',
        Cell: ({ value }: any) => <div className='text-ellipsis line-clamp-2'>{value}</div>,
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Stock',
        accessor: 'stock',
      },
      {
        Header: 'View Count',
        accessor: 'viewCount',
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
      },
      {
        Header: 'Collection',
        accessor: 'collection.name',
      },
      {
        Header: 'Category',
        accessor: 'STCategory.name',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
            <button onClick={() => console.log('edit')}>Edit</button>
            <button onClick={() => onDelete(row.original.id)}>Delete</button>
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    if (user.id) {
      onGetProducts(user.id)
    }
  }, [user])

  return (
    <Column className='gap-6'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold'>Product</h1>
        <button onClick={() => push(`${pathname}/create`)}>Create</button>
      </div>

      <Column>
        {/* filter */}
        <Row className='gap-3 justify-end w-full'>
          <FaList size={25} onClick={() => setCurrentDisplayDataType('list')} className={`${currentDisplayDataType === 'list' ? 'text-black' : 'text-gray'} cursor-pointer`} />
          <IoGrid size={25} onClick={() => setCurrentDisplayDataType('grid')} className={`${currentDisplayDataType === 'grid' ? 'text-black' : 'text-gray'} cursor-pointer`} />
        </Row>

        {/* product list */}
        {currentDisplayDataType === 'list' ? (
          < Table columns={columns} data={products} />
        ) : ''}

        {currentDisplayDataType === 'grid' ? (
          <div className='grid grid-cols-4 gap-6'>
            {products.map((item: any, key: any) => (
              <div key={key} className='col-span-1' >
                <CardProduct data={item} />
              </div>
            ))}
          </div>
        ) : ''}
      </Column>
    </Column>
  )
}

export default ProductPage