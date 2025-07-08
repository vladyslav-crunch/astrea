import {BrowserRouter, Routes, Route} from "react-router-dom";
import Auth from "./pages/auth/auth.tsx";
import Dashboard from "./pages/dashboard/dashboard.tsx"; // create this
import ProtectedRoute from "./components/core/protected-route/protected-route.tsx"; // just made
import "normalize.css";
import AppLayout from "./components/core/app-layout/app-layout.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from 'sonner';
import Shop from "./pages/shop/shop.tsx";
import Setting from "./pages/setting/setting.tsx";
import Topic from "./pages/topic/topic.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster/>
            <BrowserRouter>
                <Routes>
                    <Route path="/auth">
                        <Route path="sign-in" element={<Auth type="sign-in"/>}/>
                        <Route path="sign-up" element={<Auth type="sign-up"/>}/>
                    </Route>
                    <Route element={<ProtectedRoute/>}>
                        <Route element={<AppLayout/>}>
                            <Route path="/" element={<Dashboard/>}/>
                            <Route path="/topic/:id" element={<Topic/>}/>
                            <Route path="/shop" element={<Shop/>}/>
                            <Route path="/setting" element={<Setting/>}/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
