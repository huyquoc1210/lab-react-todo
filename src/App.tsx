import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { TodoApp } from "./components/TodoApp/";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodoApp />
    </ThemeProvider>
  );
}

export default App;
