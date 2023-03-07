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

export default function App2() {
  return (
    <div className="App-header">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing hello="yabing" />}>
            <Route path="form" element={<Form />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
