import React from "react"
import { useState } from "react"
export default function TodoInput(props){
    const {handleAddTodos,todoValue,setTodoValue}=props
   
    console.log(props)
    
    return(
        <>
        <header>
        <input placeholder="Add todo..." value={todoValue} onChange={(e)=>setTodoValue(e.target.value)}/>
        <button
        onClick={()=>{
            handleAddTodos(todoValue)
            setTodoValue('')
        }}
        >Add</button>
        </header>
        </>
    )
}