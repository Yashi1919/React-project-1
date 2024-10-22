import React from "react"
import TodoCard from "./TodoCard"


export default function TodoList(props){
    const {deletee,edit}=props
   

    return(
        <>
        <div>
            <ul className="main">
            {props.todos.map((todo,todoIndex)=>{
                return(
                    <ul className="main">
                    <TodoCard todoIndex={todoIndex} deletee={deletee} edit={edit}>
                    <p>{todo}</p>
                    </TodoCard>
                    </ul>
                )
            })}
            </ul>
        </div>
        </>
    )
}