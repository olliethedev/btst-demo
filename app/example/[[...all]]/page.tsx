import { createStackClient } from "@btst/stack/client"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { notFound } from "next/navigation"
import { todosClientPlugin } from "@/lib/plugins/todo/client/client"
import { makeQueryClient } from "@/lib/query-client"

export default async function ExamplePage({
    params
}: {
    params: Promise<{ all: string[] }>
}) {
    const pathParams = await params
    const path = pathParams?.all ? `/${pathParams.all.join("/")}` : "/"

    const { router } = createStackClient({
        plugins: {
            todos: todosClientPlugin
        }
    })

    const route = router.getRoute(path)

    if (!route) {
        return notFound()
    }

    const { PageComponent, loader } = route
    const queryClient = makeQueryClient()

    if (loader) {
        await loader(queryClient)
    }
    if (!PageComponent) {
        return notFound()
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PageComponent />
        </HydrationBoundary>
    )
}
