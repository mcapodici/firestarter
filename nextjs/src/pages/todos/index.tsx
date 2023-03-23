import { Todo, WithId, WithUid } from "@/backend/IBackend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "@/components/Alert";
import FieldErrorAlert from "@/components/FieldErrorAlert";
import Layout from "@/components/Layout";
import { Context } from "@/context/Context";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RequiresLoginNotice from "@/components/RequiresLoginNotice";
import { faTrash, faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

type FormData = {
  title: string;
};

const TodoCollectionName = "todo";

export default function Todos() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const { user, backend, addToast, authLoading } = useContext(Context);

  const [todos, setTodos] = useState<(Todo & WithId & WithUid)[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async ({ title }: FormData) => {
    if (user) {
      const addTodoResult = await backend.addUserItem<Todo>(TodoCollectionName, user.uid, { title, done: false });
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
    if (todo) backend.setUserItem<Todo>(TodoCollectionName, todo.id, { done: !todo.done });
    setTodos((todos) => {
      return todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    });
  };

  const deleteTodo = async (id: string) => {
    backend.deleteUserItem(TodoCollectionName, id);
    setTodos((todos) => {
      return todos.filter((t) => t.id !== id);
    });
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      backend.getUserItems<Todo>(TodoCollectionName, user.uid).then((todos) => {
        if (todos.result === "success") {
          setTodos(todos.items);
          setLoading(false);
        } else {
          setHasError(true);
        }
      });
    }
  }, [backend, user, addToast]);

  let content: JSX.Element;

  if (!user && authLoading) {
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
        {(loading || todos.length) > 0 && (
          <table className="min-w-full text-left text-sm font-light max-w-full">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">
                  #
                </th>
                <th scope="col" className="px-6 py-4">
                  What
                </th>
                <th scope="col" className="px-6 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <>
                  <tr className="border-b dark:border-neutral-500">
                    <td>
                      <div className="m-2 w-1/2 h-8 content-placeholder"></div>
                    </td>
                    <td>
                      <div className="m-2 w-3/4 h-8 content-placeholder"></div>
                    </td>
                    <td>
                      <div className="m-2 w-3/4 h-8 content-placeholder"></div>
                    </td>
                  </tr>
                </>
              ) : (
                todos.map((todo, index) => (
                  <tr
                    key={todo.id}
                    className="border-b dark:border-neutral-500"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {index + 1}
                    </td>
                    <td
                      className={
                        `wpx-6 py-4 ` +
                        (todo.done ? "line-through" : "")
                      }
                    >
                      {todo.title}
                    </td>
                    <td className="flex justify-end gap-2 p-2">
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="button blue"
                        aria-label={`Remove '${todo.title}'`}
                      >
                        <FontAwesomeIcon title="Remove" icon={faTrash} />
                      </button>
                      <button
                        onClick={() => toggle(todo.id)}
                        className="button blue thin md:thick"
                        aria-label={`Toggle '${todo.title}'`}
                      >
                        <FontAwesomeIcon title="Toggle" icon={todo.done ? faToggleOff : faToggleOn} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
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
          <h1 className="title mb-12">
            Todos
          </h1>
          {content}
        </div>
      </Layout>
    </>
  );
}
