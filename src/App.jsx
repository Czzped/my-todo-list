import { useState } from "react"
import { Todo } from "./Components/Todo"

export function App() {
  const [todoText, setTodoText] = useState('')
  const [todos, setTodos] = useState(() => {
    const todos = JSON.parse(localStorage.getItem('todos-list'))

    if (todos) {
      return todos
    }
    return []
  })


  function handleTodoTextChange(ev) {
    setTodoText(ev.target.value)
  }

  function handleTodoSubmit(ev) {
    ev.preventDefault()

    const newTodo = {
      todoText: todoText,
      isComplete: false
    }

    const newTodos = [...todos, newTodo]

    setTodos(newTodos)
    setTodoText('')

    localStorage.setItem('todos-list', JSON.stringify(newTodos))
  }

  return (
    <div className="container">
      <header>
        <h1>Todo</h1>
        <hr />
      </header>

      <main>
        <form onSubmit={handleTodoSubmit}>
          <input type="text" required placeholder="Adicione uma tarefa..." onChange={handleTodoTextChange} value={todoText} />
          <button>Criar</button>
        </form>

        <br />

        <div className="todosState">
          <span>Tarefas Criada: {todos.length}</span>
          <br />
          <span>Concluídas: { }</span>
        </div>

        <br />

        <ul className="todos">
          {
            todos.length > 0 ?
              <>
                {
                  todos.map((todo) => {
                    return (
                      <Todo todo={todo} todos={todos} setTodos={setTodos} key={Math.random() * 1000000} />
                    )
                  })
                }
              </>
              :
              <>
                <img src="./src/assets/clipboard.png" alt="" />
                <h3>Você ainda não tem tarefas cadastradas</h3>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </>
          }
        </ul>
      </main>

      <footer>
        <hr />
        <p>Made with ❤️ by Pedro Henrique</p>
      </footer>
    </div>
  )
}