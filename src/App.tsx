import { JSX } from "react";
import { Routes, Route } from "react-router";
import Index from "pages/index";
import TestRoute from "pages/testroute";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/test" element={<TestRoute />} />
    </Routes>
  );
}

export default App;
