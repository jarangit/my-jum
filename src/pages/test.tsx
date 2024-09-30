import React, { useEffect, useState } from 'react'
import catalogs from '../mockData/catalog.json'
import { LuDatabase } from 'react-icons/lu'
import { IoFileTrayFullOutline, IoFileTrayFullSharp } from 'react-icons/io5'
import { PiFilesBold } from 'react-icons/pi'
import { GoFileDirectory, GoFileDirectoryFill } from 'react-icons/go'
type Props = {}
const dataCatalogs = catalogs.data
const data = {
  "menu": [
    {
      "id": 1,
      "title": "Home",
      "link": "/home",
      "submenu": []
    },
    {
      "id": 2,
      "title": "Products",
      "link": "/products",
      "submenu": [
        {
          "id": 21,
          "title": "Electronics",
          "link": "/products/electronics",
          "submenu": [
            {
              "id": 211,
              "title": "Mobile Phones",
              "link": "/products/electronics/mobile-phones",
              "submenu": []
            },
            {
              "id": 212,
              "title": "Laptops",
              "link": "/products/electronics/laptops",
              "submenu": []
            }
          ]
        },
        {
          "id": 22,
          "title": "Furniture",
          "link": "/products/furniture",
          "submenu": [
            {
              "id": 221,
              "title": "Tables",
              "link": "/products/furniture/tables",
              "submenu": []
            },
            {
              "id": 222,
              "title": "Chairs",
              "link": "/products/furniture/chairs",
              "submenu": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "title": "About",
      "link": "/about",
      "submenu": []
    },
    {
      "id": 4,
      "title": "Contact",
      "link": "/contact",
      "submenu": [
        {
          "id": 41,
          "title": "Support",
          "link": "/contact/support",
          "submenu": [
            {
              "id": 411,
              "title": "Technical Support",
              "link": "/contact/support/technical",
              "submenu": []
            },
            {
              "id": 412,
              "title": "Customer Service",
              "link": "/contact/support/customer-service",
              "submenu": []
            }
          ]
        }
      ]
    }
  ]
}
const Test = (props: Props) => {
  const [catalogsSelected, setCatalogsSelected] = useState<any>()
  const [currentPath, setCurrentPath] = useState<any[]>([])
  console.log("🚀 ~ Test ~ currentPath:", currentPath)

  const onFileSelected = (data: any) => {
    const foundAdded = currentPath.find((item) => item.id === data.id)
    console.log("🚀 ~ onFileSelected ~ foundAdded:", foundAdded)
    if (!foundAdded) {
      setCurrentPath((prevUsers) => [...prevUsers, data]);
    }
    setCatalogsSelected(data)
  }

  const renderObject = ({ obj, isOpen }: any) => {
    return Object.entries(obj).map(([key, value]: any) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        // ถ้าค่าเป็น object ที่ไม่ใช่ array ให้เรียก recursive function เพื่อแสดง object ซ้อน
        return (
          <>
            {isOpen && <>
              <li key={key} className=''>
                <strong>{key}:</strong>
                <ul>{renderObject({ obj: value, isOpen: false })}</ul>
              </li>
            </>}
          </>
        );
      } else if (Array.isArray(value)) {
        return (
          <div key={key} className='pl-24 !bg-gray-400'>
            {/* {isOpen && renderArray(value)} */}
          </div>
        )
      } else {
        return (
          <>
            {isOpen &&
              <>
                <li key={key}>
                  <strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value}
                </li>
              </>
            }
          </>
        );
      }
    });
  };

  const RenderArray = ({ data }: any) => {
    return (
      <div className=''>
        {data.map((item: any, key: any) => (
          <div key={key} className=''>
            <div className='flex gap-1 items-center underline cursor-pointer'>
              <IoFileTrayFullOutline />
              <div onClick={() => onFileSelected(item)} >
                {item.name.localized[0].value}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const RenderFileList = ({ data }: any) => {
    return (
      <div className='mt-6'>
        <div className='grid grid-cols-4 gap-5'>
          {data?.children && data.children.length && data.children.map((item: any, key: any) => (
            <div key={key}>
              <div onClick={() => onFileSelected(item)} className='flex gap-1 items-center border px-3 py-1 bg-gray-100 rounded-sm cursor-pointer justify-between'>
                <div className='flex gap-1 items-center underline'>
                  <GoFileDirectory />
                  <div className='max-w-32 overflow-ellipsis overflow-hidden text-nowrap'>
                    {item.name.localized[0].value}
                  </div>
                </div>
                <div className='text-gray-600'>
                  {item?.children ? `(${item.children.length})` : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  useEffect(() => {
  }, [catalogsSelected])

  return (
    <div>
      <div className='grid grid-cols-4 border'>
        <div className='col-span-1 p-3 bg-gray-400'>
          <div className='text-2xl font-bold mb-3'>Catalogs</div>
          <RenderArray data={dataCatalogs} />
        </div>
        <div className='col-span-3 p-3'>
          <div className=' text-gray-500  flex gap-3'>
            {currentPath.map((item: any, key: any) => (
              <div className='underline' key={key}>{item.name.localized[0].value} {'>'}</div>
            ))}
          </div>
          <RenderFileList data={catalogsSelected} />
        </div>
      </div>
    </div>
  )
}

export default Test