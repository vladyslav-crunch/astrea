import {BrowserRouter, Routes, Route} from "react-router-dom";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard"; // create this
import {AuthProvider} from "./context/user-context";
import ProtectedRoute from "./components/auth/protected-route"; // just made
import "normalize.css";

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
                        <Route path="/" element={<Dashboard/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
