import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "./pages/auth.tsx";
import 'normalize.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth">
                    <Route path="sign-in" element={<Auth type="sign-in"/>}/>
                    <Route path="sign-up" element={<Auth type="sign-up"/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;