"use client"
import { usePluginOverrides } from "@btst/stack/client"
import { useId } from "react"
import { useCreateTodo, useDeleteTodo, useTodos, useToggleTodo } from "./hooks"
import type { TodosPluginOverrides } from "./overrides"

export function TodosListPage() {
    const { data: todos, isLoading } = useTodos()
    const toggleTodoMutation = useToggleTodo()
    const deleteTodoMutation = useDeleteTodo()
    const { Link } = usePluginOverrides<TodosPluginOverrides>("todos")

    return (
        <div className="mx-auto max-w-2xl p-6">
            <h1 className="mb-6 font-bold text-3xl">Todos</h1>

            <div className="mb-6">
                <Link
                    href="/example/todos/add"
                    className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                    Add Todo
                </Link>
            </div>

            <div className="space-y-2">
                {isLoading && (
                    <div className="text-gray-500">Loading todos...</div>
                )}

                {todos?.map((todo) => (
                    <div
                        key={todo.id}
                        className="flex items-center gap-3 rounded-lg border border-gray-200 p-3"
                    >
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() =>
                                toggleTodoMutation.mutate({
                                    id: todo.id,
                                    completed: !todo.completed
                                })
                            }
                            className="h-5 w-5"
                        />
                        <span
                            className={`flex-1 ${todo.completed ? "text-gray-400 line-through" : ""}`}
                        >
                            {todo.title}
                        </span>
                        <button
                            type="button"
                            onClick={() => deleteTodoMutation.mutate(todo.id)}
                            className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ))}

                {todos?.length === 0 && (
                    <div className="py-8 text-center text-gray-500">
                        No todos yet.{" "}
                        <Link href="/example/todos/add">Add a todo</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export function AddTodoPage() {
    const createTodoMutation = useCreateTodo()
    const { Link } = usePluginOverrides<TodosPluginOverrides>("todos")

    const id = useId()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const title = formData.get("title") as string

        await createTodoMutation.mutateAsync({ title })

        // Reset form (stored reference before async operation)
        form.reset()
    }

    return (
        <div className="mx-auto max-w-2xl p-6">
            <h1 className="mb-6 font-bold text-3xl">Add Todo</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="title"
                        className="mb-1 block font-medium text-sm"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id={id}
                        name="title"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={createTodoMutation.isPending}
                        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:bg-gray-400"
                    >
                        {createTodoMutation.isPending
                            ? "Adding..."
                            : "Add Todo"}
                    </button>

                    <Link
                        href="/example/todos"
                        className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                    >
                        Cancel
                    </Link>
                </div>

                {createTodoMutation.isError && (
                    <div className="text-red-500 text-sm">
                        Error: {createTodoMutation.error.message}
                    </div>
                )}

                {createTodoMutation.isSuccess && (
                    <div className="text-green-500 text-sm">
                        Todo added successfully!
                    </div>
                )}
            </form>
        </div>
    )
}
