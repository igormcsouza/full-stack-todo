import React from "react";

import TodoContextProvider from "./TodoContext";
import Home from "./pages/Home";

const App: React.FC<{}> = () => (
  <TodoContextProvider>
    <Home />;
  </TodoContextProvider>
);
export default App;
