import { createTheme, ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./App";
import "./index.css";

const queryClient = new QueryClient();

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeProvider theme={darkTheme}>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
  </ThemeProvider>
);
