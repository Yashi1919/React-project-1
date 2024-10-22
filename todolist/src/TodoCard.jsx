import React from "react";


function TodoCard(props){
    const {children,deletee,todoIndex,edit}=props
    return(
        <>
        
        <li className="todoItem" key={todoIndex}>
            {children} 
            <button onClick={()=>edit(todoIndex) }>
            <i class="fa-solid fa-pen-to-square"></i> 
            </button> 
        <button onClick={()=>deletee(todoIndex)}>
        <i class="fa-solid fa-trash" ></i>
        </button>
        </li>
        </>
    )
}



export default TodoCard;