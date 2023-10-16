import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { ChangeEvent, FormEvent, useState } from "react";

export interface SearchTodoProps {
  onSearchTodo: (value: string) => void;
}

export default function SearchTodo({ onSearchTodo }: SearchTodoProps) {
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearchTodo(value.trim());
  };

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
