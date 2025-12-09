import { ToDoItem } from "./ToDoItem"

export const List = ({items, onRemove, onToggle}) => {
    console.log(items);
    
    return <div>
        <p> {items.length} todos</p>
        {
            items.map(item => <ToDoItem 
                    key={item.id} 
                    onRemove={onRemove}
                    onToggle={onToggle}
                    {...item}
            />)
        }
    </div>
}