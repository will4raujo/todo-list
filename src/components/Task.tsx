import styles from './Task.module.css'
import { Circle, Trash2, CircleCheck } from 'lucide-react'
import { useState } from 'react'

interface TaskType {
  id: string
  isChecked: boolean
  text: string
}

interface TaskProps {
  task: TaskType;
  onDeleteTask: (id: string) => void;
  onChangeCheck: (id: string) => void;
}


export function Task( {task, onDeleteTask, onChangeCheck} : TaskProps) {
  const [checked, setChecked] = useState(task.isChecked)

  function handleOnChangeCheck() {
    setChecked(!checked)
    onChangeCheck(task.id)
  }

  function handleOnDeleteTask() {
    onDeleteTask(task.id)
  }

  return (
    <li className={styles.taskWrapper}>
      <label htmlFor={task.id} className={checked ? styles.checked : styles.unchecked}>
        {checked ? <CircleCheck /> : <Circle />}
        <input type="checkbox" id={task.id} onChange={handleOnChangeCheck} checked={checked} />
        {task.text}
      </label>
      <button onClick={handleOnDeleteTask}>
        <Trash2 />
      </button>
    </li>
  )
}
