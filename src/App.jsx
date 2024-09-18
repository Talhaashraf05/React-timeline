import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import Home from "./pages/home.jsx";
import Error from "./pages/error.jsx";
import MainLayout from "./layout/mainLayout.jsx";
import Login from "./pages/auth/Login.jsx";
import AuthLayout from "./layout/authLayout.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ConfigProvider, theme} from "antd";
import {useSelector} from "react-redux";
import Signup from "./pages/auth/Signup.jsx";


function App() {
    const {defaultAlgorithm, darkAlgorithm} = theme;
    const isDarkMode = useSelector((state) => state.appStore.theme);


    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route element={<AuthLayout/>}>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                </Route>

                {/*For main layout*/}
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<Home/>}/>
                </Route>
                {/*For error page*/}
                <Route path="*" element={<AuthLayout/>}>
                    <Route path="*" element={<Error/>}/>
                </Route>
            </>
        ),
    )
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#8953d0',
                    },
                    fontFamily: {
                        base: 'Poppins, sans-serif',
                    },
                    algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                }}
            >
                <RouterProvider router={router}/>
                <ToastContainer pauseOnHover={false} autoClose={3000} closeOnClick transition:zoom/>
            </ConfigProvider>
        </>
    )
}

export default App
