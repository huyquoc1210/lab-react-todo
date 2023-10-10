import { Box, Container } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { Filter, Todo } from "../../models";
import { AddTodo } from "./AddTodo";
import { FilterTodo } from "./FilterTodo";
import ListTodo from "./ListTodo";
import { SearchTodo } from "./SearchTodo";
import { TitleTodo } from "./TitleTodo";
import { sleep } from "../../utils/misc";
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

  function handleAddTodo(todo: Todo) {
    setTodoList((prevTodo) => [...prevTodo, todo]);
  }

  async function handleDeleteTodo(todoId: string) {
    if (!todoList) return null;

    await sleep(1000);

    const newTodoList = todoList.map((todo) => {
      if (todo.id !== todoId) return todo;
      return { ...todo, isDelete: true };
    });
    setTodoList(newTodoList);
  }

  function handleUndoTodo(todoDelete: Todo) {
    setTodoList((prevTodo) => [
      ...prevTodo,
      { ...todoDelete, isDelete: false },
    ]);
    // .filter(
    //     (todo) => todo.id !== todoDelete.id
    //   )
    // );
    // undoTodo.map(todo=>{
    //   if(todo.id!==todoDelete.id)
    // })
    // todoList.filter((todo) => {
    //   if (todo.id !== todoDelete.id) {
    //     setTodoList((prevTodo) => [
    //       ...prevTodo,
    //       { ...todoDelete, isDelete: false },
    //     ]);
    //   }
    // });
  }

  const handleChangTodoCallback = useCallback(
    function handleChangeTodo(todoId: string) {
      const newTodoList = todoList.map((todo) => {
        if (todo.id !== todoId) return todo;
        return { ...todo, isCompleted: !todo.isCompleted };
      });
      setTodoList(newTodoList);
    },
    [todoList]
  );

  function handleSearchTodo(value: string) {
    setQuery(value);
  }

  function handleFilterTodo(filter: Filter) {
    setFilter(filter);
  }
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
      <Container maxWidth="sm">
        <TitleTodo />

        <SearchTodo onSearchTodo={handleSearchTodo} />

        <AddTodo onAddTodo={handleAddTodo} />

        <FilterTodo filter={filter} onFilterTodo={handleFilterTodo} />

        <ListTodo
          todoList={result}
          onChangeTodo={handleChangTodoCallback}
          onDeleteTodo={handleDeleteTodo}
          onUndoTodo={handleUndoTodo}
        />
      </Container>
    </Box>
  );
}
