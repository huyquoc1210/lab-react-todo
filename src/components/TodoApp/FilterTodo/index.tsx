import { Box, Button } from "@mui/material";
import { Filter } from "../../../models";

export interface FilterTodoProps {
  filter: Filter;
  onFilterTodo: (filter: Filter) => void;
}

export function FilterTodo({ filter, onFilterTodo }: FilterTodoProps) {
  //   function handleClickAll(_event: MouseEvent<HTMLButtonElement>) {
  //     onFilterTodo("all");
  //   }
  //   //   console.log(filter);

  //   function handleClickCompleted(event: MouseEvent<HTMLButtonElement>) {
  //     onFilterTodo("completed");
  //   }

  //   function handleClickUncompleted(event: MouseEvent<HTMLButtonElement>) {
  //     onFilterTodo("uncompleted");
  //   }

  //   function handleClickDeleted(event: MouseEvent<HTMLButtonElement>) {
  //     onFilterTodo("deleted");
  //   }

  function handleClick(filter: Filter) {
    return function () {
      onFilterTodo(filter);
    };
  }

  return (
    <Box sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
      <Button
        variant={filter === "all" ? "contained" : "outlined"}
        onClick={handleClick("all")}
      >
        All
      </Button>
      <Button
        variant={filter === "completed" ? "contained" : "outlined"}
        onClick={handleClick("completed")}
      >
        Completed
      </Button>
      <Button
        variant={filter === "uncompleted" ? "contained" : "outlined"}
        onClick={handleClick("uncompleted")}
      >
        Uncompleted
      </Button>
      <Button
        variant={filter === "deleted" ? "contained" : "outlined"}
        onClick={handleClick("deleted")}
      >
        Deleted
      </Button>
    </Box>
  );
}
