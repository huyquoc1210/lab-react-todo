import { Box, Container } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { sleep } from "src/utils/misc";
import { Filter, Todo } from "../../types";
import DeleteTodo from "../DeleteTodo";
import ToastTodo from "../ToastTodo";
import AddTodo from "./AddTodo";
import FilterTodo from "./FilterTodo";
import ListTodo from "./ListTodo";
import SearchTodo from "./SearchTodo";
import TitleTodo from "./TitleTodo";

// import { v4 as uuidv4 } from "uuid";

const TODOLIST: Todo[] = [
  {
    id: crypto.randomUUID(),
    title: "Learn Reactjs",
    isCompleted: false,
    isDelete: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Learn TypeScript",
    isCompleted: true,
    isDelete: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Learn JavaScript",
    isCompleted: false,
    isDelete: false,
  },
];

export function TodoApp() {
  const [todoList, setTodoList] = useState<Todo[]>(() => TODOLIST);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [todo, setTodo] = useState<Todo | null>(null);
  const [open, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  // Add Todo
  function handleAddTodo(todo: Todo) {
    setTodoList((prevTodo) => [...prevTodo, todo]);
    setTodo(todo);
    setOpenToast(true);
  }

  // Toast Todo
  const handleCloseToast = () => {
    setOpenToast(false);
  };

  async function handleDeleteTodo() {
    if (!todo) return;

    await sleep(1000); //

    const newTodoList = todoList.map((item) => {
      if (item.id !== todo.id) return item;
      return { ...item, isDelete: true };
    });
    setTodoList(newTodoList);
  }

  const handleCloseDeleteTodo = async () => {
    setOpen(false);
    setOpenToast(true);
    await sleep(350); // Khoảng thời gian todo.title bị xoá trước tắt modal
    setTodo(null);
  };

  const handleOpenDeleteTodo = (todo: Todo) => {
    setTodo(todo);
    setOpen(true);
  };

  const handleUndoTodo = (todoDelete: string) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoDelete) {
        return { ...todo, isDelete: false };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const handleChangeTodo = useCallback(
    (todoId: string) => {
      const newTodoList = todoList.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
      setTodoList(newTodoList);
    },
    [todoList]
  );

  const handleSearchTodo = (value: string) => {
    setQuery(value);
  };

  const handleFilterTodo = (filter: Filter) => {
    setFilter(filter);
  };
  // console.log(query);

  function filterTodo(todoList: Todo[], query: string, filter: Filter) {
    query = query.toLowerCase();

    const newTodoList = todoList.filter((todo) =>
      todo.title.split(" ").some((word) => word.toLowerCase().startsWith(query))
    );

    switch (filter) {
      case "completed": {
        return newTodoList.filter((todo) => todo.isCompleted && !todo.isDelete);
      }
      case "uncompleted": {
        return newTodoList.filter(
          (todo) => !todo.isCompleted && !todo.isDelete
        );
      }
      case "deleted": {
        return newTodoList.filter((todo) => todo.isDelete);
      }
      default: {
        return newTodoList.filter((todo) => !todo.isDelete);
      }
    }
  }

  const result = useMemo(
    () => filterTodo(todoList, query, filter),
    [todoList, query, filter]
  );

  return (
    <Box sx={{ mt: 15 }}>
      <ToastTodo openToast={openToast} onClose={handleCloseToast} todo={todo} />

      <Container maxWidth="sm">
        <TitleTodo />

        <SearchTodo onSearchTodo={handleSearchTodo} />

        <AddTodo onAddTodo={handleAddTodo} />

        <FilterTodo filter={filter} onFilterTodo={handleFilterTodo} />

        <ListTodo
          todoList={result}
          onChangeTodo={handleChangeTodo}
          onDeleteTodo={handleOpenDeleteTodo}
          onUndoTodo={handleUndoTodo}
        />
      </Container>

      <DeleteTodo
        open={open}
        todo={todo}
        onClose={handleCloseDeleteTodo}
        onDelete={handleDeleteTodo}
      />
    </Box>
  );
}
