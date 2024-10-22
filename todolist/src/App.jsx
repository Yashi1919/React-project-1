import React from "react"
import TodoInput from "./TodoInput"
import TodoList from "./TodoList"
import TodoCard from "./TodoCard"
import { useState,useEffect } from "react"

export default function App(){



const [todos,setTodos]=useState([])
const [todoValue,setTodoValue]=useState('')

function persistData(newList){
  localStorage.setItem('todos',JSON.stringify({todos:newList}))
}


function handleAddTodos(newTodo){
const newTodoList=[...todos,newTodo]
setTodos(newTodoList)
persistData(newTodoList)
}

function handleDeleteTodo(index){
  console.log(index)
  const newTodoList=todos.filter((todo,todoIndex)=>{
    return todoIndex!==index
  })
  setTodos(newTodoList)
persistData(newTodoList)

}

function handleEditTodo(index){
  const valueToBeEdited=todos[index]
  setTodoValue(valueToBeEdited)
  handleDeleteTodo(index)
 
}

useEffect(()=>{
  if(!localStorage){
    return
  }
  let localTodos=localStorage.getItem('todos')
  if(!localTodos){
    return
  }
  localTodos=JSON.parse(localTodos).todos
  setTodos(localTodos)
},[])

  return (
    <>
    <TodoInput todos={todos} setTodoValue={setTodoValue} todoValue={todoValue} handleAddTodos={handleAddTodos} />
    <TodoList todos={todos} deletee={handleDeleteTodo} edit={handleEditTodo}/>
    </>
  )
}