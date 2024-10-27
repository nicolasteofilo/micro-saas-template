import { AppPage } from '../_components/page'
import { AddTodoSheet } from './_components/add-todo-sheet'
import { ITodo, TodosTable } from './_components/todos-table'

const data: ITodo[] = [
  {
    id: '1',
    title: 'Concluir o projeto',
    createdAt: new Date(),
    updatedAt: new Date(),
    finishedAt: new Date(),
  },
  {
    id: '2',
    title: 'Fazer o almoço',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: '3',
    title: 'Estudar React',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    id: '4',
    title: 'Fazer exercícios',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    finishedAt: new Date(),
  },
  {
    id: '5',
    title: 'Ler livro',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 4)),
  },
  {
    id: '6',
    title: 'Fazer compras',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 5)),
    finishedAt: new Date(),
  },
  {
    id: '7',
    title: 'Limpar a casa',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 6)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 6)),
  },
  {
    id: '8',
    title: 'Pagar contas',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 7)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 7)),
    finishedAt: new Date(),
  },
  {
    id: '9',
    title: 'Ligar para o médico',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 8)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 8)),
  },
  {
    id: '10',
    title: 'Atualizar currículo',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 9)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 9)),
    finishedAt: new Date(),
  },
  {
    id: '11',
    title: 'Estudar TypeScript',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 10)),
  },
  {
    id: '12',
    title: 'Preparar apresentação',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 11)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 11)),
    finishedAt: new Date(),
  },
  {
    id: '13',
    title: 'Revisar código',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 12)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 12)),
  },
  {
    id: '14',
    title: 'Backup dos arquivos',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 13)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 13)),
    finishedAt: new Date(),
  },
  {
    id: '15',
    title: 'Organizar emails',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 14)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 14)),
  },
  {
    id: '16',
    title: 'Agendar reunião',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 15)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 15)),
    finishedAt: new Date(),
  },
  {
    id: '17',
    title: 'Estudar Next.js',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 16)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 16)),
  },
  {
    id: '18',
    title: 'Configurar ambiente',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 17)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 17)),
    finishedAt: new Date(),
  },
  {
    id: '19',
    title: 'Atualizar dependências',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 18)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 18)),
  },
  {
    id: '20',
    title: 'Escrever documentação',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 19)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 19)),
    finishedAt: new Date(),
  },
  {
    id: '21',
    title: 'Resolver bugs',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 20)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 20)),
  },
  {
    id: '22',
    title: 'Implementar testes',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 21)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 21)),
    finishedAt: new Date(),
  },
  {
    id: '23',
    title: 'Otimizar performance',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 22)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 22)),
  },
  {
    id: '24',
    title: 'Refatorar código',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 23)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 23)),
    finishedAt: new Date(),
  },
  {
    id: '25',
    title: 'Criar componentes',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 24)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 24)),
  },
  {
    id: '26',
    title: 'Estudar TDD',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 25)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 25)),
    finishedAt: new Date(),
  },
  {
    id: '27',
    title: 'Configurar CI/CD',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 26)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 26)),
  },
  {
    id: '28',
    title: 'Revisar PR',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 27)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 27)),
    finishedAt: new Date(),
  },
  {
    id: '29',
    title: 'Estudar Docker',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 28)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 28)),
  },
  {
    id: '30',
    title: 'Fazer deploy',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 29)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 29)),
    finishedAt: new Date(),
  },
  {
    id: '31',
    title: 'Estudar AWS',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 30)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 30)),
  },
  {
    id: '32',
    title: 'Configurar monitoramento',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 31)),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 31)),
    finishedAt: new Date(),
  },
]

export default async function App() {
  return (
    <AppPage title="Início" path="/app" actions={<AddTodoSheet />}>
      <TodosTable data={data} className="pr-4" />
    </AppPage>
  )
}
