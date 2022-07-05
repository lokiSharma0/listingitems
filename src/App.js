import './App.css';
import {List} from './list'
import {Alert} from './alert'
import { useEffect, useState} from 'react'

const getitems=()=>{
  let list =localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }else{
    return []
  }
}

function App() {
  const[people,setPeople]=useState("")
  const[list,setList]=useState(getitems())
  const[alert,setAlert]=useState({show:false,msg:"",type:""})
  const[isediting,setIsediting]=useState(false)
  const[editId,setEditId]=useState(null)


  const handleSubmit=(e)=>{
    console.log(people)
 e.preventDefault()
if(!people){
 showAlert(true,"danger","Pleae fill the items")

}else if(people && isediting){
  setList(list.map((items)=>{
if(items.id===editId){
  return{...items,people}
}
return items

  })
  )
  showAlert(true,"success","Item successfully edited")
  setPeople("")
  setEditId(null)
  setIsediting(false)
}else{
  showAlert(true,"success","Item added successed")
  const newItems={id:new Date().getTime().toString(),people}
  setList([...list,newItems])
  setPeople("")
}

  }
  const showAlert=(show=false,type="",msg="")=>{
    setAlert({show,type,msg})
  }
  const clearitems=()=>{
    showAlert(true,"danger","Empty List")
    setList([])
  }
  const removeitems=(id)=>{
    showAlert(true,"danger","Item is removed successfully")
    setList(list.filter((items)=>items.id !==id))
  }
  const editing=(id)=>{
  const specificitem=list.find((items)=>items.id ===id);
  setIsediting(true)
  setEditId(id)
  setPeople(specificitem.people)

  }
 useEffect(()=>{
  localStorage.setItem('list',JSON.stringify(list))
 },[list])
  return (
   
      <section className='section-center'>
        <form >
         {alert.show &&<Alert {...alert} list={list} removealt={showAlert}/>}
         <h3>List your Items</h3>
        <div className='grocery-container'>
          <input
           type="text"
            placeholder='e.g fish'
            value={people}
            onChange={(e)=>{setPeople(e.target.value)}}
            />
           <button type="button" className='submit-btn' onClick={handleSubmit}>{isediting?"Edit":"Submit"}</button>
        </div>
        </form>
        {list.length>0 &&
        
        <div className='grocery-container'>
           <List items={list} removeitem={removeitems} editing={editing}/>
           <button className='clear-btn' onClick={clearitems}>Clear the List</button>
        </div>
        }
      </section>
  
  );
}

export default App;
