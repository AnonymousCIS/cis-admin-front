// Context - 전역 공유하는 값
'use client'

import { createContext, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { setDefaultLocale } from 'react-datepicker'
import { ko } from 'date-fns/locale'
import loadable from '@loadable/component'
import useUser from '../hooks/useUser'

const Side = loadable(() => import('../ui/outlines/Side'))

setDefaultLocale(ko)

type ContextType = {
  state?: { title?: string; menuCode?: string }
  actions?: {
    setTitle?: (title: string) => void
    setMenuCode?: (code: string) => void
  }
}

const CommonContext = createContext<ContextType>({})

const CommonProvider = ({ children }) => {
  const { isAdmin } = useUser()

  const [title, setTitle] = useState<string | undefined>()

  const [menuCode, setMenuCode] = useState<string | undefined>()

  const value: ContextType = {
    state: { title, menuCode },
    actions: { setTitle, setMenuCode },
  }

  return (
    <CommonContext.Provider value={value}>
      <HelmetProvider>
        <>
          <Helmet>{title && <title>{title}</title>}</Helmet>
          {isAdmin && <Side />}
          {children}
        </>
      </HelmetProvider>
    </CommonContext.Provider>
  )
}

const { Consumer: CommonConsumer } = CommonContext

export { CommonProvider, CommonConsumer }

export default CommonContext
