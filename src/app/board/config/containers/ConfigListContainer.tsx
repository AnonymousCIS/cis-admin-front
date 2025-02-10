'use client'

import React from 'react'
import ConfigList from '../components/ConfigList'
import useMenuCode from '@/app/global/hooks/useMenuCode'

const ConfigListContainer = () => {
  useMenuCode('board', 'configList')

  return <ConfigList />
}

export default React.memo(ConfigListContainer)
