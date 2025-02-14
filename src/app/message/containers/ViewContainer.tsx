'use client'
import React ,{useLayoutEffect, useState} from 'react'
import ViewForm from '../components/ViewForm'
import { getMessage } from '../services/actions'

const ViewConatiner = ({seq}) => {
  const [data, setData] = useState<any>()

  useLayoutEffect(() => {
    (async () => {
      const _data = await getMessage(seq)
      if(!_data){
        return
      }

      setData(_data)
    })()
  }, [seq])
  
  return <ViewForm data={data}/>
}

export default React.memo(ViewConatiner)
