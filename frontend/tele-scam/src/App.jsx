
import { CssBaseline, Container } from "@mui/material";
import Dashboard from "./components/dashboard";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Dashboard />
      </Container>
    </>
  );
};

export default App;
