"use client"
import Image from 'next/image'
import React, { useState } from 'react'

type Props = {}
const bgData = [
  {
    label: '1',
    value: 'at-bg-white'
  },
  {
    label: '2',
    value: 'at-bg-pink'
  },
  {
    label: '3',
    value: 'at-bg-blue'
  },
  {
    label: '1',
    value: 'at-bg-black'
  },
  {
    label: '1',
    value: 'at-bg-gold'
  },
]
const CreateProductPage = (props: Props) => {
  const [bgSelected, setBgSelected] = useState(bgData[0].value)
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<any>(null);
  const [sizeImage, setSizeImage] = useState(1)

  const handleImageChange = (e: any) => {
    setSelectedImage(e.target.files[0]);
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedImage);
  };
  return (
    <div>
      <div className='grid grid-cols-4 gap-6'>
        <div className='col-span-3'>
          <div className='min-h-[80vh] bg-gray-300 rounded-xl p-6'>
            <div className='border border-white w-72 rounded-3xl overflow-hidden mx-auto p-3 bg-white'>
              <div className={`${bgSelected} w-full  h-72 relative rounded-3xl`}>
                <Image
                  src={`${previewUrl ?? '/assets/images/jum-product.png'}`}
                  alt='product'
                  fill
                  style={{ objectFit: 'contain' }}
                  className={`${sizeImage ? `scale-[${sizeImage}]` : ''} py-3`}
                />
              </div>
              <div className='flex py-4 px-3 justify-between items-center bg-white'>
                <strong>{`MEGA SPACE MOLLY`}</strong>
                <strong>{`#jr`}</strong>
              </div>
            </div>

            {/* bg color */}
            <div className='flex gap-3 justify-center mt-3'>
              {bgData.map((item: any, key) => (
                <div key={key}>
                  <div className={`${item.value} ${bgSelected == item.value ? 'border-2 border-blue-300' : ''}  w-6 h-6 rounded-full cursor-pointer`} onClick={() => setBgSelected(item.value)}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='col-span-1'>
          <h3 className='text-2xl font-bold mb-3'>Detail</h3>
          <form>
            <div className='flex flex-col gap-3'>
              {previewUrl && <img src={previewUrl} alt="Selected" style={{ width: '200px', marginTop: '10px' }} />}
              <input type="file" onChange={handleImageChange} />
              <select onChange={(e: any) => setSizeImage(e.target.value)}>
                <option value={1}>x1</option>
                <option value={1.2}>x2</option>
                <option value={1.3}>x3</option>
              </select>
              <input type="text" placeholder='Name' className='border  border-gray-300 rounded-lg py-2 px-3' />
              <textarea rows={6} placeholder='Story' className='border border-gray-300  rounded-lg py-2 px-3' ></textarea>
              <div className='flex justify-end'>
                <button className='ad-button'>Go</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProductPage