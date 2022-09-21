import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home";
import Navigation from "./routes/navigation/navigation";
import Signin from "./routes/sign-in/sign-in";

const Shop = () => {
  return <h1>Im the shop page</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<Signin />} />
      </Route>
    </Routes>
  );
};

export default App;
