import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { setFormData, updateFormData } from "../redux/slice/formDataSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";

const TodoForm = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todoData = useSelector((state: RootState) => state.formData.data);
  const editId: string | null = useSelector((state: RootState) => state.formData.editId);
  console.log(editId, "editId");

  type FormData = {
      id?: string;
    name: string;
    description:string,
    date: string;
    priority:string;
    status: boolean;
  };

  const editData = todoData.filter((item) => item.id === editId)
  console.log(editData, "eeeeeeeeeee");

  const [form, setForm] = useState<FormData>({
    name: "",
    description:"",
    date: "",
    priority:"",
    status: false,
  });

  console.log(form.status, "formformformform");
  useEffect(() => {
    if (editData && editData[0]?.name && editData[0]?.date) {
      setForm({
        name: editData[0].name,
        description:editData[0].description,
        date: editData[0].date,
        priority:editData[0].priority,
        status: editData[0].status,
      });
    }
  }, []);

  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = (todayDate.getMonth() + 1).toString().padStart(2,'0')
  const dd = todayDate.getDate().toString().padStart(2,'0');
  const midDate = `${year}-${month}-${dd}`
  console.log(todayDate,'todayDate')
  console.log(midDate,'midDate')

  // const [selectDate, setSelectDate] = useState()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    
    const { name, value } = e.target;
  console.log(name,'aaa', value)
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editId !== null) {
      // console.log("aaaa", form, editIndex);
      dispatch(updateFormData({ id: editId, updated: form }));
    } else {
      // console.log(form);/
      dispatch(setFormData({...form , id: uuidv4() }));
    }

    navigate("/searchTodo");
    setForm({
      name: "",
      description:"",
      date: "",
      priority:"",
      status: false,
    });
  };
  console.log(form.status, "aaaaa");

  return (
    <div className=" flex items-center mt-20 justify-center ">
<form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md">
  {/* Task Name */}
  <div className="flex flex-col">
    <label htmlFor="name" className="text-gray-700 font-medium mb-1">Task Name</label>
    <input
      id="name"
      name="name"
      type="text"
      value={form.name}
      onChange={handleChange}
      className="px-4 py-2 border border-gray-300 rounded-lg text-black"
      placeholder="Enter your task"
      required
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="description" className="text-gray-700 font-medium mb-1">Description</label>
    <textarea
      id="description"
      name="description"
      value={form.description}
      onChange={handleChange}
      className="px-4 py-2 border border-gray-300 rounded-lg text-black"
      placeholder="Enter task details"
      rows={3}
      required
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="date" className="text-gray-700 font-medium mb-1">Due Date</label>
    <input
      id="date"
      type="date"
      name="date"
      value={form.date}
      onChange={handleChange}
      min={midDate}
      className="px-4 py-2 border border-gray-300 rounded-lg text-black"
      required
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="priority" className="text-gray-700 font-medium mb-1">Priority</label>
    <select
      id="priority"
      name="priority"
      value={form.priority}
      onChange={handleChange}
      className="px-4 py-2 border border-gray-300 rounded-lg text-black"
      required
    >
      <option value="">Select priority</option>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
  </div>


  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg w-full"
  >
    Submit
  </button>
</form>


    </div>
  );
};

export default TodoForm;
