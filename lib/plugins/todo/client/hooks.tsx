"use client"
import {
    createApiClient,
    getServerBaseURL
} from "@btst/stack/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import type { TodosApiRouter } from "../api/backend"

export function useTodos() {
    const client = createApiClient<TodosApiRouter>({
        baseURL: getServerBaseURL()
    })

    return useQuery({
        queryKey: ["todos"],
        queryFn: async () => {
            const response = await client("/todos", {
                method: "GET"
            })
            return response.data
        }
    })
}

export function useCreateTodo() {
    const client = createApiClient<TodosApiRouter>({
        baseURL: getServerBaseURL()
    })
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: { title: string; completed?: boolean }) => {
            const response = await client("@post/todos", {
                method: "POST",
                body: data
            })
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        }
    })
}

export function useToggleTodo() {
    const client = createApiClient<TodosApiRouter>({
        baseURL: getServerBaseURL()
    })
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: { id: string; completed: boolean }) => {
            const response = await client("@put/todos/:id", {
                method: "PUT",
                params: { id: data.id },
                body: { completed: data.completed }
            })
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        }
    })
}

export function useDeleteTodo() {
    const client = createApiClient<TodosApiRouter>({
        baseURL: getServerBaseURL()
    })
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await client("@delete/todos/:id", {
                method: "DELETE",
                params: { id }
            })
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        }
    })
}
