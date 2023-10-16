import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { Todo } from "src/types";
import { sleep } from "src/utils/misc";

export interface AddTodoProps {
  onAddTodo: (todo: Todo) => void;
}

export function AddTodo({ onAddTodo }: AddTodoProps) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const capitalize = (str: string) => {
    return str
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      await sleep(2000);

      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: capitalize(value.trim()),
        isCompleted: false,
        isDelete: false,
      };

      onAddTodo(newTodo);
      setValue("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      noValidate
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.5,
        mb: 1.5,
      }}
    >
      <TextField
        type="text"
        placeholder="Add..."
        sx={{ flexGrow: 1 }}
        onChange={handleChange}
        value={value}
      />

      <LoadingButton
        variant="contained"
        type="submit"
        size="medium"
        startIcon={<AddIcon />}
        loadingPosition="start"
        loading={loading}
      >
        Add
      </LoadingButton>
    </Box>
  );
}
