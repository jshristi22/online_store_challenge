import OnlineStore from "./presentation/pages/online_store/online_store";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <OnlineStore />
    </QueryClientProvider>
  );
}
export default App;
