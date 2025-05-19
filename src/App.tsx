import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Home from './pages/Home';
import SearchTodo from './pages/SearchTodo';
import CompleteTodo from './pages/CompleteTodo';
import TodoForm from './pages/TodoForm';

function App() {
  return (
    <BrowserRouter >
    <div className='min-h-screen w-full bg-green-100'>
      <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/searchTodo" element={<SearchTodo />} />
      <Route path="/completeTodo" element={<CompleteTodo />} />
      <Route path="/todoForm" element={<TodoForm />} />
    </Routes>
    </div>
    
    </BrowserRouter>
  );
}

export default App;
