import {BrowserRouter, Routes, Route} from "react-router-dom";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard"; // create this
import {AuthProvider} from "./context/user-context";
import ProtectedRoute from "./components/auth/protected-route"; // just made
import "normalize.css";
import AppLayout from "./pages/app-layout.tsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/auth">
                        <Route path="sign-in" element={<Auth type="sign-in"/>}/>
                        <Route path="sign-up" element={<Auth type="sign-up"/>}/>
                    </Route>
                    <Route element={<ProtectedRoute/>}>
                        <Route element={<AppLayout/>}>
                            <Route path="/" element={<Dashboard/>}/>
                            <Route path="/shop" element={<Dashboard/>}/>
                            <Route path="/setting" element={<Dashboard/>}/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
