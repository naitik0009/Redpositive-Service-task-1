import { Authenticated } from "./src/routes/pages";
import { AlertProvider } from "./src/context/alert";
export default function App() {
  return (
  <AlertProvider>
    <Authenticated/>
    </AlertProvider>
  );
}


