import { useRef, useState } from "react"

export function Todo({ todo, todos, setTodos, setCompletedTodos }) {
    const input = useRef(null)
    const [isTodoComplete, setIsTodoComplete] = useState(todo.isComplete)

    function removeTodo() {
        const newTodos = todos.filter((currentTodo) => {
            return currentTodo !== todo
        })

        setTodos(newTodos)
        setCompletedTodos(() => newTodos.filter(todo => todo.isComplete === true))

        localStorage.setItem('todos-list', JSON.stringify(newTodos))
    }

    function completeTodo() {
        input.current.classList.toggle("completeTodo");

        const indexOfTodo = todos.indexOf(todo)

        todos[indexOfTodo].isComplete = !todos[indexOfTodo].isComplete

        setIsTodoComplete(!isTodoComplete)
        setTodos(todos)
        setCompletedTodos(() => todos.filter(todo => todo.isComplete === true))

        localStorage.setItem('todos-list', JSON.stringify(todos))
    }

    return (
        <div className="todo">
            <input type="checkbox" onChange={completeTodo} checked={isTodoComplete} />
            {
                isTodoComplete ?
                    <span className="completeTodo" ref={input}>{todo.todoText}</span>
                    :
                    <span ref={input}>{todo.todoText}</span>
            }
            <button onClick={removeTodo}>{
                <img src="../src/assets/trash.png" alt="" />
            }</button>
        </div>
    )
}