import { Alert, Box, Snackbar } from "@mui/material";
import { Todo } from "src/types";

export interface ToastTodoProps {
  openToast: boolean;
  onClose: () => void;
  todo: Todo | null;
}

export default function ToastTodo(props: ToastTodoProps) {
  const { openToast, onClose, todo } = props;

  return (
    <Box>
      <Snackbar open={openToast} autoHideDuration={6000} onClose={onClose}>
        <Alert
          onClose={onClose}
          severity="success"
          sx={{ backgroundColor: "#509B55", color: "#000" }}
        >
          This is a success <strong>{todo?.title}</strong>!
        </Alert>
      </Snackbar>
    </Box>
  );
}
