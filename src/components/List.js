import React, {useState} from 'react';

const List = React.memo(({id, title, completed, todoData, setTodoData, provided, snapshot, handleClick}) =>{
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditTitle] = useState(title)
    const handleCompleteChange = (id) => {
        let newTodoData = todoData.map(data => {
            if(data.id === id) {
                data.completed = ! data.completed;
            }
            return data;
        })
        setTodoData(newTodoData);
    }
    const handleEditCahnge = (event) => {
        setEditTitle(event.target.value);
    }

    const handleSubmit= (event) =>{
        event.preventDefault();
        let newTodoData = todoData.map(data => {
            if(data.id === id) {
                data.title = editedTitle;
            }
            return data;
        })
        setTodoData(newTodoData);
        setIsEditing(false)
    }
    
    if(isEditing){
        return (
            <div className={`flex items-center justify-between w-full px-4 py-1 my-2 bg-gray-100 text-gray-600 border rounded`}>
                <div className="items-center">
                    <form onSubmit={handleSubmit}>
                        <input value={editedTitle}
                               onChange={handleEditCahnge}
                               className="w-full px-3 py-2 mr-4 text-gray-500 rounded"/>
                    </form>
                </div>
                <div className="items-center">
                    <button onClick={handleSubmit} className="px-4 py-2 floot-right" type="submit" >save</button>
                    <button className="px-4 py-2 floot-right" onClick={() => setIsEditing(false)}>x</button>
                </div>
            </div>
        )
    } else{
        return(
            <div key={id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}
                 className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}>

                <div className="items-center">
                    <input type={"checkbox"} defaultChecked={completed} onChange={() => handleCompleteChange(id)}/>
                    <span className={completed ? "line-through": undefined}> {title}</span>
                </div>
                <div className="items-center">
                    <button className="px-4 py-2 floot-right" onClick={() => setIsEditing(true)}>edit</button>
                    <button className="px-4 py-2 floot-right" onClick={() => handleClick(id)}>x</button>
                </div>
            </div>
        )
    }
})

export default List