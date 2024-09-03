import OnlineStore from "./presentation/pages/online_store/online_store";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const queryClient = new QueryClient();
const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <OnlineStore />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
export default App;
