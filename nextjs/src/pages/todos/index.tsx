import Layout from '@/components/Layout'

export default function Todos() {

  return (
    <>
      <Layout>
        <div className="m-auto max-w-md mt-20 text-center">
          <h1 className="text-5xl font-bold pb-2 mt-0 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-black">Todos</h1>
        </div>
        <div className="m-auto max-w-5xl m-2">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4 w-2">#</th>
                <th scope="col" className="px-6 py-4">What</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                <td className="whitespace-nowrap px-6 py-4">Eat Cake</td>
              </tr>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                <td className="whitespace-nowrap px-6 py-4">Run Mile</td>
              </tr>
              <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                <td className="whitespace-nowrap px-6 py-4">Drink Water</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2 text-right">
            <button type="submit" className="button blue w-full md:w-fit">Add Todo</button>
          </div>
        </div>
      </Layout>
    </>
  )
}
