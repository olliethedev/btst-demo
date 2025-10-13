import Link from "next/link"

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-8">
            <div className="w-full max-w-2xl space-y-8">
                <div className="text-center">
                    <h1 className="mb-4 font-bold text-4xl">
                        Example Lib Demo
                    </h1>
                    <p className="mb-8 text-gray-600 text-lg">
                        A modular, plugin-based library for full-stack
                        applications
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md">
                        <h2 className="mb-2 font-semibold text-2xl">
                            📬 Messages
                        </h2>
                        <p className="mb-4 text-gray-600">
                            Create and view messages. Demonstrates SSR with
                            React Query prefetching.
                        </p>
                        <Link
                            href="/example"
                            className="inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        >
                            View Messages
                        </Link>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md">
                        <h2 className="mb-2 font-semibold text-2xl">
                            ✅ Todos
                        </h2>
                        <p className="mb-4 text-gray-600">
                            Manage your todos. Shows CRUD operations with
                            optimistic updates.
                        </p>
                        <Link
                            href="/example/todos"
                            className="inline-block rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                        >
                            View Todos
                        </Link>
                    </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-6">
                    <h3 className="mb-3 font-semibold text-xl">
                        🔌 Plugin Architecture
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>
                            ✓ <strong>Modular</strong>: Each feature is a
                            self-contained plugin
                        </li>
                        <li>
                            ✓ <strong>Composable</strong>: Add/remove
                            functionality via configuration
                        </li>
                        <li>
                            ✓ <strong>Flexible</strong>: Works with SSR, SPA, or
                            API-only
                        </li>
                        <li>
                            ✓ <strong>Type-safe</strong>: Full TypeScript
                            support
                        </li>
                    </ul>
                </div>

                <div className="rounded-lg bg-blue-50 p-6">
                    <h3 className="mb-3 font-semibold text-xl">
                        🚀 Quick Example
                    </h3>
                    <pre className="overflow-x-auto rounded bg-gray-800 p-4 text-gray-100 text-sm">
                        {`// Add a plugin in 3 lines:
const api = createBackendLib({
  plugins: {
    messages: messagesPlugin.backend,
    todos: todosPlugin.backend, // ← Just add it!
  },
  adapter: createMemoryAdapter(),
});`}
                    </pre>
                </div>

                <div className="text-center">
                    <a
                        href="https://github.com"
                        className="text-blue-500 underline hover:text-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View Documentation →
                    </a>
                </div>
            </div>
        </div>
    )
}
