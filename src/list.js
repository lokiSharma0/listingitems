import React from 'react'
import {FaEdit,FaTrash} from 'react-icons/fa'

export const List = ({items,removeitem,editing}) => {
  return (
    <div className='grocery-list'>
{items.map(({id,people})=>{
    return(

        <div key={id} className='grocery-item'>
            <p>{people}</p>
            <div>
            <button type='button' className='edit-btn' onClick={()=>{editing(id)}} ><FaEdit/></button>
            <button type='button' className='delete-btn' onClick={()=>removeitem(id)}><FaTrash/></button>
            </div>
        </div>
    )
})}
    </div>
  )
}
