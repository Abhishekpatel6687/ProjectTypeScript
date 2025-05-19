
  import { useCompleteTodos } from "../hooks/useCompleteTodos";

const CompleteTodo = () => {
  const completeTodo = useCompleteTodos();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
        ✅ Completed Tasks
      </h2>

      <div className="space-y-6 max-w-4xl mx-auto">
        {completeTodo.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl px-6 py-5 transition hover:shadow-lg border-r-4 border-l-4 border-green-500"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-700">{item.name}</h3>
                <p className="text-gray-500 mt-1">{item.description}</p>
              </div>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  item.priority === "High"
                    ? "bg-red-100 text-red-600"
                    : item.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {item.priority}
              </span>
              
            </div>

            <div className="mt-4 text-sm text-gray-400">📅 {item.date}</div>
            <div className="mt-1 text-sm text-green-600 font-semibold">
              Status: Complete
            </div>
          </div>
        ))}

        {completeTodo.length === 0 && (
          <div className="text-center text-gray-400 text-lg mt-20">
            No completed tasks yet. 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteTodo;


