import { Todo } from "@/backend/IBackend";
import { Alert } from "@/components/Alert";
import FieldErrorAlert from "@/components/FieldErrorAlert";
import Layout from "@/components/Layout";
import { Context } from "@/context/Context";
import { match } from "ts-pattern";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RequiresLoginNotice from "@/components/RequiresLoginNotice";

type FormData = {
  title: string;
};

export default function Todos() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const { user, backend, addToast, authLoading } = useContext(Context);

  const [todos, setTodos] = useState<(Todo & { id: string })[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);

  const onSubmit = async ({ title }: FormData) => {
    if (user) {
      const addTodoResult = await backend.addTodo(user.uid, title);
      if (addTodoResult.result === "success") {
        todos.push({ id: addTodoResult.id, title, done: false, uid: user.uid });
        reset();
      } else {
        addToast(
          "Sorry the todo was not added, there was a problem connecting to the server.",
          "danger"
        );
      }
    }
  };

  const toggle = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) backend.setTodo({ id: todo.id, done: !todo.done });
    setTodos((todos) => {
      return todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    });
  };

  const deleteTodo = async (id: string) => {
    backend.deleteTodo(id);
    setTodos((todos) => {
      return todos.filter((t) => t.id !== id);
    });
  };

  useEffect(() => {
    if (user) {
      backend.getTodos(user.uid).then((todos) => {
        if (todos.result === "success") {
          setTodos(todos.items);
        } else {
          setHasError(true);
        }
      });
    }
  }, [backend, user, addToast]);

  let content: JSX.Element;

  if (authLoading) {
    content = <></>;
  } else if (!user) {
    content = <RequiresLoginNotice />;
  } else if (hasError) {
    content = (
      <p className="text-center">
        Sorry there was an issue connecting to the server. Please reload to try
        again.
      </p>
    );
  } else {
    content = (
      <div className="m-auto max-w-5xl p-2">
        {todos.length > 0 && (
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">
                  #
                </th>
                <th scope="col" className="px-6 py-4 w-full">
                  What
                </th>
                <th scope="col" className="px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => (
                <tr key={todo.id} className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {index + 1}
                  </td>
                  <td
                    className={
                      `whitespace-nowrap px-6 py-4 ` +
                      (todo.done ? "line-through" : "")
                    }
                  >
                    {todo.title}
                  </td>
                  <td className="flex gap-2 p-2">
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="button blue"
                      aria-label={`Remove '${todo.title}'`}
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => toggle(todo.id)}
                      className="button blue"
                      aria-label={`Toggle '${todo.title}'`}
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="mt-10 text-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <input
                maxLength={100}
                {...register("title", { required: "Title is required" })}
                type="text"
                className="input"
                aria-describedby="Title"
                placeholder="E.g. buy shoelaces"
              />
              <FieldErrorAlert error={errors.title} />
            </div>
            <button type="submit" className="button blue w-full md:w-fit">
              Add Todo
            </button>
            {errors.root?.serverError && (
              <div className="mt-2">
                <Alert level="danger">{errors.root.serverError.message}</Alert>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <Layout>
        <div className="m-auto max-w-5xl mt-20 text-center">
          <h1 className="text-5xl font-bold pb-2 mt-0 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-black">
            Todos
          </h1>
          {content}
        </div>
      </Layout>
    </>
  );
}
