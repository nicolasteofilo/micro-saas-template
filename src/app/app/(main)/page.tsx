import { AppPage } from '../_components/page'
import { AddTodoSheet } from './_components/add-todo-sheet'
import { TodosTable } from './_components/todos-table'
import { getUserTodos } from './actions'

export default async function App() {
  const todos = await getUserTodos()

  return (
    <AppPage title="Início" path="/app" actions={<AddTodoSheet />}>
      <TodosTable data={todos} className="pr-4" />
    </AppPage>
  )
}
