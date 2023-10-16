import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import { ChangeEvent, MouseEvent, memo } from "react";
import { Todo } from "src/types";

export interface ListTodoProps {
  todoList: Todo[];
  onChangeTodo: (id: string) => void;
  onDeleteTodo: (todo: Todo) => void;
  onUndoTodo: (id: string) => void;
}

export default memo(function ListTodo(props: ListTodoProps) {
  const { todoList, onChangeTodo, onDeleteTodo, onUndoTodo } = props;
  // function handleDeleteTodo(id: string) {
  //   return function () {
  //     const newTodoList = todoList.filter((todo) => todo.id !== id);
  //     setTodoList(newTodoList);
  //   };
  // }
  // const [deletedItem, setDeletedItem] = useState(null);

  const handleDelete =
    (todo: Todo) => (event: MouseEvent<HTMLButtonElement>) => {
      onDeleteTodo(todo);
    };

  function handleChange(todoId: string) {
    return function (event: ChangeEvent<HTMLInputElement>) {
      onChangeTodo(todoId);
    };
  }
  // console.log(todoList);
  function handleUndo(todoId: string) {
    return function (event: MouseEvent<HTMLButtonElement>) {
      onUndoTodo(todoId);
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
            {!isDelete ? (
              <Box>
                <Checkbox checked={isCompleted} onChange={handleChange(id)} />
                <IconButton onClick={handleDelete(todo)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ) : (
              <Box>
                <IconButton onClick={handleUndo(id)}>
                  <UndoIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
});
