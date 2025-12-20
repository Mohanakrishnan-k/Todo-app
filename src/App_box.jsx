import React, { useEffect, useRef, useState } from 'react'
import './App_box.css'

const App_box = () => {

  const inputRef = useRef();
  const [list, setList] = useState([]);

  useEffect(()=>{
   setList(JSON.parse(localStorage.getItem('todo_list')) || [])
  },[])

  const handleCheck = (id) =>
  {
     const listItems = list.map((item) => (
      (id === item.id)? {id:item.id,checked:!item.checked,item:item.item} : item
     ))
     setList(listItems)

     localStorage.setItem('todo_list',JSON.stringify(listItems))
  }

  const handleDelete = (id) =>{
    const listItems = list.filter((item)=>(
      (id !== item.id)
    ))
    setList(listItems)
    localStorage.setItem('todo_list',JSON.stringify(listItems))
  }

  const addItem =(task)=>{
     if(!task) {
      alert("Enter the list item...")
      return;
     }
     const id = list.length? (list[list.length-1].id)++ : 1;
     const item = {id,checked:false,item:task}
     const newList = [...list,item]
     setList(newList)
     inputRef.current.value = '';
     localStorage.setItem('todo_list',JSON.stringify(newList))
  }

  return (
    <div className='container'>
      <h2>Todo App</h2>
          <div className='input-div' >
              <input 
              ref={inputRef}
              type="text" 
              className='input-add' 
              placeholder='add item'
              onSubmit={()=>console.log(inputRef.current.value)}
              onKeyDown={(e)=>{
                if(e.key === "Enter"){
                  addItem(e.target.value)
                }
              }}
              />
              <i className="bi bi-plus-square-fill add-icon"
              onClick={()=>
              {
                {return addItem(inputRef.current.value),
                   inputRef.current.focus()
                }
              }}
              ></i>
          </div>    
          {list.length?
          <div className='item-div'>
           <ul className='main-list'>
            {list.map((item)=>(
             <li className='item-list' key={item.id}>
                <div className='list'>
                  <input 
                   readOnly
                   type="checkbox"
                   className='input-check' 
                   checked={item.checked}
                   onClick={()=>handleCheck(item.id)}
                   />
                  <div className='item'>
                    <p 
                    style={item.checked? {"textDecoration": "line-through","color":"black"}:null}
                    >{item.item}</p>
                  </div>
                  <i className="bi bi-trash3-fill trash-icon"
                   onClick={()=>handleDelete(item.id)}
                  ></i>
                </div>
              </li>
            ))}
           </ul>
        </div>
        :
        <div className='item-div empty-message'>
            <p>Your list is empty</p>
            <p>Add new items to the list</p>
        </div>
      }
        
    </div>
  )
}

export default App_box