import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import { ChangeEvent, MouseEvent, memo } from "react";
import { Todo } from "src/models";

export interface ListTodoProps {
  todoList: Todo[];
  onChangeTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onUndoTodo: (todo: Todo) => void;
}

export default memo(function ListTodo({
  todoList,
  onChangeTodo,
  onDeleteTodo,
  onUndoTodo,
}: ListTodoProps) {
  // function handleDeleteTodo(id: string) {
  //   return function () {
  //     const newTodoList = todoList.filter((todo) => todo.id !== id);
  //     setTodoList(newTodoList);
  //   };
  // }
  // const [deletedItem, setDeletedItem] = useState(null);

  function handleDelete(todoId: string) {
    return function (event: MouseEvent<HTMLButtonElement>) {
      onDeleteTodo(todoId);
    };
  }

  function handleChange(todoId: string) {
    return function (event: ChangeEvent<HTMLInputElement>) {
      onChangeTodo(todoId);
    };
  }
  // console.log(todoList);
  function handleUndo(todo: Todo) {
    return function (event: MouseEvent<HTMLButtonElement>) {
      onUndoTodo(todo);
      // setDeletedItem(null)
    };
  }

  console.log(todoList);

  // function handleChangeTodo(id: string) {
  //   return function () {
  //     const newTodoList = todoList.map((todo) => {
  //       if (todo.id !== id) return todo;
  //       return { ...todo, isCompleted: !todo.isCompleted };
  //     });
  //     setTodoList(newTodoList);
  //   };
  // }

  // const handleChange =
  //   (todoId: string) => (_event: ChangeEvent<HTMLInputElement>) => {
  //     onChangeTodo(todoId);
  //   };

  // const handleDelete =
  //   (todoId: string) => (_event: MouseEvent<HTMLButtonElement>) => {
  //     onDeleteTodo(todoId);
  //   };

  return (
    <Box>
      {todoList.map((todo) => {
        const { id, title, isCompleted, isDelete } = todo;
        // console.log(isCompleted);
        let todoContent;
        !isDelete &&
          (todoContent = (
            <Box>
              <Checkbox checked={isCompleted} onChange={handleChange(id)} />
              <IconButton onClick={handleDelete(id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ));

        isDelete &&
          (todoContent = (
            <Box>
              <IconButton onClick={handleUndo(todo)}>
                <UndoIcon />
              </IconButton>
            </Box>
          ));

        return (
          <Box
            key={id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                textDecoration: isCompleted ? "line-through" : "none",
                color: isCompleted ? "primary.main" : "text.primary",
              }}
            >
              {title}
            </Typography>
            {todoContent}
          </Box>
        );
      })}
    </Box>
  );
});
