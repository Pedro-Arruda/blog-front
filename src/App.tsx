import { AuthContextProvider } from "./context/authContext";
import { Router } from "./router";

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
