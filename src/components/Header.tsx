import { Link } from "react-router-dom";
import { MdMenuOpen } from "react-icons/md";
import { useState } from "react";

const Header = () => {
  type NavItem = {
    id: number;
    path: string;
    name: string;
  };

  const navItems: NavItem[] = [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/searchTodo", name: "Todo List" },
    { id: 3, path: "/completeTodo", name: "Complete Todo" },
    { id: 4, path: "/todoForm", name: "Add Todo" },
  ];

  const [open, setOpen] = useState(false);
  const handleMenu = () => setOpen(prev => !prev);

  return (
    <div className="flex px-9 bg-gradient-to-r from-green-200/40 to-blue-200/40 backdrop-blur-xs top-0 sticky h-20 justify-between items-center">

      <h1 className="font-bold text-3xl text-purple-800">
        Today is the best day!
      </h1>

      <div className="hidden md:flex space-x-8">
        {navItems.map(item => (
          <Link key={item.id} className="text-lg font-semibold" to={item.path}>
            {item.name}
          </Link>
        ))}
      </div>

      <div className="md:hidden">
        <MdMenuOpen size={32} onClick={handleMenu} className="text-blue-700 cursor-pointer" />
      </div>

      {open && (
        <div className="absolute top-20 left-0  w-full bg-gradient-to-r from-green-200 to-blue-200  flex flex-col items-center px-9 py-4 space-y-4 md:hidden shadow-md z-50">
          {navItems.map(item => (
            <Link
              key={item.id}
              className="text-lg font-semibold"
              to={item.path}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
