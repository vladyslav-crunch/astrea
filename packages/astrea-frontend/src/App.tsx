import {BrowserRouter, Routes, Route} from "react-router-dom";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard"; // create this
import ProtectedRoute from "./components/auth/protected-route"; // just made
import "normalize.css";
import AppLayout from "./pages/app-layout.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
    );
}

export default App;
