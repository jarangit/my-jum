// import Image from 'next/image'
// import React, { useContext, useEffect, useState } from 'react'
// import { Dna } from 'react-loader-spinner'
// import { useAppSelector } from '~/app-state/redux/hook'
// import { AppContext } from '~/app-state/store'

// type Props = {}

// const Loading = ({}: Props) => {
//   const stateUI = useAppSelector((state: any) => state?.stateUI)
//   const { showLoading } = useContext(AppContext)

//   if (!stateUI.showLoading && !showLoading) {
//     return null
//   }

//   return (
//     <>
//       <div
//         className={` fixed  left-0 right-0 top-0 z-50 flex h-screen w-full   items-center justify-center overflow-hidden bg-black/50 backdrop-invert backdrop-opacity-10 transition-all  duration-700`}
//       >
//         <div className="flex flex-col items-center gap-3">
//           <Image src={'/assets/images/logo/logo.png'} alt="" width={220} height={220} />
//           <div>
//             <Dna
//               visible={true}
//               height="80"
//               width="80"
//               ariaLabel="dna-loading"
//               wrapperStyle={{}}
//               wrapperClass="dna-wrapper"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//     // <div className='fixed z-[1000] w-screen h-screen bg-gray'>
//     //   <Dna
//     //     visible={true}
//     //     height="80"
//     //     width="80"
//     //     ariaLabel="dna-loading"
//     //     wrapperStyle={{}}
//     //     wrapperClass="dna-wrapper"
//     //   />
//     // </div>
//   )
// }

// export default Loading