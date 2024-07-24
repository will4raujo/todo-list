import styles from  './App.module.css'
import todo from '../src/assets/todo.svg'
import rocket from '../src/assets/rocket.svg'
import { CirclePlus, ClipboardList } from 'lucide-react'
import { Task } from './components/Task'
import { useState, FormEvent } from 'react'

interface TaskProps {
  id: string
  text: string
  isChecked: boolean
}

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([
    {
      id: '1',
      text: 'Estudar React',
      isChecked: true
    },
    {
      id: '2',
      text: 'Estudar Typescript',
      isChecked: false
    },
  ])

  const [newTask, setNewTask] = useState('')

  const handleAddNewTask = (task: TaskProps) => {
    setTasks([...tasks, task])
  }

  const deleteTask = (id: string) => {
    const tasksWithoutDeletedOne = tasks.filter(task => task.id !== id)
    setTasks(tasksWithoutDeletedOne)
  }

  const handleOnChangeCheck = (id: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          isChecked: !task.isChecked
        }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    handleAddNewTask({
      id: String(Math.random()),
      text: newTask,
      isChecked: false
    })
    setNewTask('')
  }

  const finishedTasks = tasks.filter(task => task.isChecked).length

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <img src={rocket} alt="logo" />
        <img src={todo} alt="logo" />
      </header>
      <main>
        <form className={styles.taskForm} onSubmit={handleSubmit}>
          <input type="text" placeholder="Adicione uma nova tarefa" value={newTask} onChange={(e) => setNewTask(e.target.value)} required />
          <button type="submit" >
            Criar
            <CirclePlus size={16}/>
          </button>
        </form>
        <div className={styles.taskContainer}>
          <header>
            <div className={styles.tasksCounter} >
              <strong>Tarefas criadas</strong>
              <span>{tasks.length}</span>
            </div>
            <div className={styles.tasksCounter} >
              <strong>Concluídas</strong>
              <span>{`${finishedTasks} de ${tasks.length}`}</span>
            </div>
          </header>
          {
            tasks.length === 0 && (
              <div className={styles.emptyTasks}>
                <ClipboardList />
                <p>
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                  <br/>
                  Crie tarefas e organize seus itens a fazer
                </p>
              </div>
            )
          }
          <ul> 
            {tasks.map(task => {
              return <Task key={task.id} task={task} onDeleteTask={deleteTask}  onChangeCheck={handleOnChangeCheck} />
            }
            )}
          </ul>
        </div>
      </main>
    </div>
  )
}

export default App
