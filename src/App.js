import {
  // createBrowserRouter,
  // RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import Form from "./Components/Form";
import ErrorPage from "./Components/ErrorPage";
import "./App.css";
import Navbar from "./Components/Navbar";
import React from "react";

// v1
// export default function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Landing />,
//       errorElement: <ErrorPage />,
//     },
//     { path: "auth", element: <Login /> },
//     { path: "form", element: <Form /> },
//   ]);

//   return (
//     <div>
//       <RouterProvider router={router} />;
//     </div>
//   );
// }

// v2
const fakeUser = {
  name: "Sam",
  favFood: "Potatoes",
};
export const UserContext = React.createContext(fakeUser);
export default function App2() {
  // make a state and update it
  // to update the UserContext Provider below
  return (
    <div className="App-header">
      <BrowserRouter>
        <UserContext.Provider value={fakeUser}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing hello="yabing" />}>
              <Route path="form" element={<Form />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}
