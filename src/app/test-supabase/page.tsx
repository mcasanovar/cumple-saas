import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos, error } = await supabase.from("todos").select();

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Error connection Supabase</h1>
        <pre className="mt-4 p-4 bg-gray-100 rounded">{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      {todos && todos.length > 0 ? (
        <ul className="list-disc pl-5">
          {todos.map((todo: any) => (
            <li key={todo.id} className="py-1">
              {todo.name || todo.title || JSON.stringify(todo)}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No todos found in 'todos' table, but connection seems works!</p>
      )}
    </div>
  );
}
