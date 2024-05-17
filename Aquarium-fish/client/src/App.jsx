import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import { AuthContext } from "./contexts/authContext";
import AuthGuard from "./components/guards/AuthGuard";

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import { Create } from "./components/Create/Create";
import { Catalog } from "./components/Catalog/Catalog";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Logout } from "./components/Logout/Logout";
import { Details } from "./components/Details/Details";
import { Edit } from "./components/Edit/Edit";

function App() {
  const [auth, setAuth] = useState(() => {
    // retrieves the value stored in the browser's local storage under the "UserInfo" key.
    let token = JSON.parse(localStorage.getItem("UserInfo"));
    if (token) {
      const locStToken = token.token;
      const locStrEmail = token.email;
      const locStrId = token.userId;
      if (locStrEmail && locStToken) {
        return { email: locStrEmail, token: locStToken, userId: locStrId };
      }
    }

    return {};
  })

  const isAuthenticated = (info) => {
    setAuth(info)
  };

  const value = {
    email: auth?.email ?? null,
    userId: auth?.userId ?? null,
    isLog: !!auth?.email,
    isAuthenticated
  };

  return (

    <AuthContext.Provider value={value}>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/catalog" element={<Catalog />} />
          <Route path="/fishes/:fishId" element={<Details />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<AuthGuard />}>
            <Route path="/create" element={<Create />} />
            <Route path='/fishes/:fishId/edit' element={<Edit />} />
            <Route path='/logout' element={<Logout />} />

          </Route>
        </Routes>

      </main>
      <Footer />

    </AuthContext.Provider >
  )
}

export default App
