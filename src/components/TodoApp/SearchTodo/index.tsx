import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { ChangeEvent, FormEvent, useState } from "react";

export interface SearchTodoProps {
  onSearchTodo: (value: string) => void;
}

export function SearchTodo({ onSearchTodo }: SearchTodoProps) {
  const [value, setValue] = useState("");

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValue(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearchTodo(value);
  }

  return (
    <Box
      component="form"
      sx={{ mb: 1.5, display: "flex" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <TextField
        sx={{ flexGrow: 1 }}
        variant="outlined"
        placeholder="Search ..."
        onChange={handleChange}
        value={value}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
