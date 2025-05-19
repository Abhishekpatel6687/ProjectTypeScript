import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import {
  seteditData,
  deleteData,
  clearFormData,
  searchTodoData,
  updateComplete,
} from "../redux/slice/formDataSlice";
import { useNavigate } from "react-router-dom";
import { use, useEffect, useState } from "react";
import { useInCompleteTodos } from "../hooks/useInCompleteTodos";

const SearchTodo = () => {
  const inCompleteTodos = useInCompleteTodos();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todoData = useSelector((state: RootState) => state.formData.data);
  const searchResults = useSelector((state: RootState) => state.formData.searchResults);
  const editIndex = useSelector((state: RootState) => state.formData.editIndex);
  // console.log(editIndex, "editIndex");
  // console.log(inCompleteTodos,'inCompleteTodos')

  const [completedItems, setCompletedItems] = useState<any>({});
  // console.log("ddddddd",completedItems)
  const handleEdit = (id: string) => {
    // console.log(id, "iiiiii");
    dispatch(seteditData(id));
    navigate("/todoForm");
  };
  const handleDelete = (id: string) => {
    // console.log(id, "aaaaaaaaaiii");
    dispatch(deleteData({ id }));
  };
  // const handleClick = (e:any) => {
  //    console.log(e.target.checked,'vvvvv')
  //   setComplete(e.target.checked)
  // }
  // const handleComplete = (id:string, complete:boolean) => {
  // console.log(id,'dddd',complete)
  // dispatch(updateComplete({id:id, status:complete}))
  //   }
  // const handleComplete = (id: string, complete: boolean) => {
  //   dispatch(updateComplete({ id, status: complete }));
  // };
  const handleComplete = (id: string, complete: boolean) => {
    dispatch(updateComplete({ id, status: complete }));
    setCompletedItems((prev: any) => ({
      ...prev,
      [id]: complete,
    }));
  };
  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCompletedItems((prev: any) => ({
      ...prev,
      [id]: checked, // Update specific item status
    }));
  };
  const [searchTodo, setSearchTodo] = useState("");
  console.log(searchTodo, "sss");

  useEffect(() => {
    // if(searchTodo.length > 0) {
      dispatch(searchTodoData(searchTodo));
      console.log(searchResults,'searsearchResultschResults')
    // }else if(searchTodo === ""){
    //   dispatch(searchTodoData(" "));
    //   console.log(searchResults,'askask')
    // }
  },[searchTodo])

  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearchTodo(value); 
  };
  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-8 drop-shadow-sm">
        ✨ Your Todo List
      </h1>
      <div className="mb-9 w-full flex items-center justify-center">
        <input
          type="text"
          value={searchTodo}
          onChange={(e) => handleSearch(e)}
          className="px-4 py-2 w-full max-w-md border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 shadow-sm"
          placeholder="🔍 Search your todos..."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.length > 0
          ? searchResults.map((data) => (
              <div
                key={data.id}
                className="bg-white/40 backdrop-blur-md border border-white/30 shadow-md rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {data.name} search
                  </h2>
                  <p className="text-gray-600 mt-2">{data.description}</p>
                </div>

                <div className="flex justify-between text-sm text-gray-700 mb-4">
                  <span>📆 {data.date}</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                    🔰Priority: {data.priority}
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => handleEdit(data.id)}
                    className="bg-blue-500 cursor-pointer text-white px-4 py-1 rounded-xl hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(data.id)}
                    className="bg-red-500 cursor-pointer text-white px-4 py-1 rounded-xl hover:bg-red-600 transition"
                  >
                    Delete
                  </button>

                  <input
                    type="checkbox"
                    checked={completedItems[data.id] || data.status}
                    onChange={(e) =>
                      handleCheckboxChange(data.id, e.target.checked)
                    }
                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                  />

                  {completedItems[data.id] ? (
                    <button
                      onClick={() => handleComplete(data.id, true)}
                      // className=" text-green-700 cursor-pointer font-semibold hover:underline"
                      className="bg-green-100 cursor-pointer text-green-800 font-semibold  px-4 py-1 rounded-xl hover:bg-green-200 transition"
                    >
                      ✅ Submit
                    </button>
                  ) : (
                    <button
                      onClick={() => handleComplete(item.id, false)}
                      className="text-yellow-700 font-semibold "
                    >
                      ⏳ Incomplete
                    </button>
                  )}
                </div>
              </div>
            ))
          : inCompleteTodos.map((item) => (
              <div
                key={item.id}
                className="bg-white/40 backdrop-blur-md border border-white/30 shadow-md rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {item.name} incomppletre
                  </h2>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>

                <div className="flex justify-between text-sm text-gray-700 mb-4">
                  <span>📆 {item.date}</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                    🔰Priority: {item.priority}
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-blue-500 cursor-pointer text-white px-4 py-1 rounded-xl hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 cursor-pointer text-white px-4 py-1 rounded-xl hover:bg-red-600 transition"
                  >
                    Delete
                  </button>

                  <input
                    type="checkbox"
                    checked={completedItems[item.id] || item.status}
                    onChange={(e) =>
                      handleCheckboxChange(item.id, e.target.checked)
                    }
                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                  />

                  {completedItems[item.id] ? (
                    <button
                      onClick={() => handleComplete(item.id, true)}
                      // className=" text-green-700 cursor-pointer font-semibold hover:underline"
                      className="bg-green-100 cursor-pointer text-green-800 font-semibold  px-4 py-1 rounded-xl hover:bg-green-200 transition"
                    >
                      ✅ Submit
                    </button>
                  ) : (
                    <button
                      onClick={() => handleComplete(item.id, false)}
                      className="text-yellow-700 font-semibold "
                    >
                      ⏳ Incomplete
                    </button>
                  )}
                </div>
              </div>
            ))}

        {inCompleteTodos.length === 0 && (
          <div className="text-center text-gray-400 text-lg mt-20">
            No incompleted tasks yet. 🎉
          </div>
        )}
      </div>
    </div>
  );

  //   return (
  //     <div>
  //       {inCompleteTodos.map((item, index) => {
  //           // const [complete, setComplete] = useState(item.status);
  //         return(
  //           <div className="flex gap-40" key={index}>
  //           <h1>{item.name}</h1>
  //           <h1>{item.description}</h1>
  //           <h1>{item.date}</h1>
  //           <h1>{item.priority}</h1>
  //           <button onClick={() => handleEdit(item.id)}>Edit</button>
  //           <button onClick={() => handleDelete(item.id)}>Delete</button>
  //           {/* <div className="flex items-center space-x-2">
  //             <input
  //               // id="status"
  //               type="checkbox"
  //               // name="status"
  //               onChange={() => {}}
  //               disabled
  //               // checked={complete}
  //               // onChange={(e) => setComplete(e.target.checked)}
  //               className="w-4 h-4"
  //             />
  //         <button
  //         onClick={() => handleComplete(item.id, complete)}
  //         className="text-gray-700"
  //       >
  //         {complete ? "Mark Complete" : "Incomplete"}
  //       </button>
  //           </div> */}
  // <input
  //   type="checkbox"
  //   checked={completedItems[item.id] || item.status}
  //   onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
  //   className="w-4 h-4"
  // />

  // {completedItems[item.id] && (
  //   <button
  //     onClick={() => handleComplete(item.id, true)}
  //     className="text-gray-700"
  //   >
  //     Submit
  //   </button>
  // )}
  // {!completedItems[item.id] && (
  //   <button
  //     onClick={() => handleComplete(item.id, false)}
  //     className="text-gray-700"
  //   >
  //     Incomplete
  //   </button>
  // )}
  //         </div>
  //         )})}
  //       <button onClick={() =>  dispatch(updateComplete({ id: item.id, status: !item.status }))}>Delete All </button>
  //     </div>
  //   );
};

export default SearchTodo;
