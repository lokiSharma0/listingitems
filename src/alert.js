import React from 'react'
import { useEffect } from 'react'

export const Alert = ({msg,type,removealt,list}) => {
  useEffect(()=>{
    const timeout=setTimeout(()=>{
      removealt()
    },3000)
    return()=>clearTimeout(timeout)
  }, [list, removealt])
  return<p className={`alert alert-${type}`}>{msg}</p>
 
}
