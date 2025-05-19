import type { RootState } from "../redux/store";
import { useSelector } from "react-redux"
import type { FormEntry } from "../redux/slice/formDataSlice";
import { useCompleteTodos } from "../hooks/useCompleteTodos";
import {useInCompleteTodos} from "../hooks/useInCompleteTodos"

const Home = () => {
  const completeTodo = useCompleteTodos();
  const InCompleteTodo = useInCompleteTodos();
  const todoData: FormEntry[] = useSelector((state: RootState) => state.formData.data);

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Todo Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-10">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-600">Total Todos</h2>
          <p className="text-4xl font-bold text-blue-600 mt-4">{todoData.length}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-600">Completed Todos</h2>
          <p className="text-4xl font-bold text-green-600 mt-4">{completeTodo.length}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-600">Incomplete Todos</h2>
          <p className="text-4xl font-bold text-red-600 mt-4">{InCompleteTodo.length}</p>
        </div>
      </div>

      {/* Incomplete Todos List */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Incomplete Todo List</h3>
        {InCompleteTodo.length === 0 ? (
          <p className="text-gray-500">All todos are complete! 🎉</p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {InCompleteTodo.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-xl hover:bg-gray-200 transition"
              >
                <div>
                  <h4 className="text-lg font-medium text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
