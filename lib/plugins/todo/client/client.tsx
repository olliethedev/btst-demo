import {
    createApiClient,
    getServerBaseURL
} from "@btst/stack/client"
import { defineClientPlugin } from "@btst/stack/plugins"
import { createRoute } from "@btst/yar"
import type { QueryClient } from "@tanstack/react-query"
import type { TodosApiRouter } from "../api/backend"
import { AddTodoPage, TodosListPage } from "./components"
import { useCreateTodo, useDeleteTodo, useTodos, useToggleTodo } from "./hooks"

// Loader for SSR prefetching
async function todosLoader(queryClient: QueryClient) {
    await queryClient.prefetchQuery({
        queryKey: ["todos"],
        queryFn: async () => {
            const client = createApiClient<TodosApiRouter>({
                baseURL: getServerBaseURL()
            })

            const response = await client("/todos", {
                method: "GET"
            })

            return response.data
        }
    })
}

/**
 * Todos client plugin
 * Provides routes, components, and React Query hooks for todos
 */
export const todosClientPlugin = defineClientPlugin({
    name: "todos",

    // Default implementations for Next.js
    defaultOverrides: {
        // biome-ignore lint/suspicious/noExplicitAny: todo update
        Link: (props: any) => <a {...props} />,
        navigate: undefined // No default navigation function
    },

    routes: () => ({
        todos: createRoute("/todos", () => ({
            PageComponent: TodosListPage,
            loader: todosLoader
        })),
        addTodo: createRoute("/todos/add", () => ({
            PageComponent: AddTodoPage
        }))
    }),

    hooks: () => ({
        useTodos,
        useCreateTodo,
        useToggleTodo,
        useDeleteTodo
    })
})
