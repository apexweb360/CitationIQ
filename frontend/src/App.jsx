import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home             from "./pages/Home";
import Audit            from "./pages/Audit";
import SolutionsLocal   from "./pages/SolutionsLocal";
import SolutionsAgencies from "./pages/SolutionsAgencies";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                   element={<Home />}               />
        <Route path="/audit"              element={<Audit />}              />
        <Route path="/solutions/local"    element={<SolutionsLocal />}     />
        <Route path="/solutions/agencies" element={<SolutionsAgencies />}  />
      </Routes>
    </BrowserRouter>
  );
}
