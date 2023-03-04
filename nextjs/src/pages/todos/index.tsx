import { Todo } from '@/backend/IBackend';
import Layout from '@/components/Layout'
import { Context } from '@/context/Context'
import { useContext, useEffect, useState } from 'react'

export default function Todos() {

  const { user, backend } = useContext(Context);

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    console.log('user', user);
    if (user) {
      backend.getTodos(user.uid).then((todos) => {
        console.log(todos);
        if (todos.result === 'success') {
          setTodos(todos.items);
        }
      })
    }

  }, [user])

  return (
    <>
      <Layout>
        <div className="m-auto max-w-md mt-20 text-center">
          <h1 className="text-5xl font-bold pb-2 mt-0 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-black">Todos</h1>
        </div>
        <div className="m-auto max-w-5xl p-2">
          {todos.length > 0 &&
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4 w-2">#</th>
                  <th scope="col" className="px-6 py-4">What</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo, index) =>
                  <tr key={index} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                    <td className={`whitespace-nowrap px-6 py-4 ` + (todo.done ? 'line-through' : '')}>{todo.title}</td>
                  </tr>)}
              </tbody>
            </table>
          }
          <div className="mt-2 text-right">
            <button type="submit" className="button blue w-full md:w-fit">Add Todo</button>
          </div>
        </div>
      </Layout>
    </>
  )
}
