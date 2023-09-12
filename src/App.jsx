import { useEffect, useState } from "react"
import { Todo } from "./components/Todo"
import clipboard from "./assets/clipboard.svg"

export function App() {
  const [todoText, setTodoText] = useState('')
  const [todos, setTodos] = useState(() => {
    const todos = JSON.parse(localStorage.getItem('todos-list'))

    if (todos) {
      return todos
    }
    return []
  })
  const [completedTodos, setCompletedTodos] = useState(() => todos.filter(todo => todo.isComplete === true))


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
        <img src="https://todo-rogerinho.vercel.app/assets/logoTodo-c7e0b4eb.svg" alt="logo-img" />
      </header>

      <main>
        <form onSubmit={handleTodoSubmit}>
          <input type="text" required placeholder="Adicione uma tarefa..." onChange={handleTodoTextChange} value={todoText} />
          <button>Criar</button>
        </form>

        <br />

        <div className="TaskPane">
          <span>Tarefas Criadas: {todos.length}</span>
          <br />
          <span>Concluídas: {completedTodos.length}</span>
        </div>
        <hr />

        <br />

        <ul className="todos">
          {
            todos.length > 0 ?
              <>
                {
                  todos.map((todo) => {
                    return (
                      <Todo todo={todo} todos={todos} setTodos={setTodos} setCompletedTodos={setCompletedTodos} key={Math.random() * 100000} />
                    )
                  })
                }
              </>
              :
              <section className="noTodosFoundMessage">
                <img src={clipboard} alt="clipboard-img" />
                <br />
                <h3>Você ainda não tem tarefas cadastradas</h3>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </section>
          }
        </ul>

      </main>

      <footer>
        <p>Made with ❤️ by Pedro Henrique</p>
      </footer>
    </div>
  )
}