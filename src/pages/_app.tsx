import type { AppProps } from 'next/app'
import { Component } from 'react'
import { Provider } from 'react-redux'
import {store} from '../store/store'
import '../globals.css'
import LayoutWrapper from '@/components/layouts/layoutWrapper'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </Provider>
    </>
  )
}