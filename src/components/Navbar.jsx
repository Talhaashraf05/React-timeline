import {useNavigate} from 'react-router-dom';
import {Button, Tooltip} from "antd";
import {useDispatch} from "react-redux";
import {logout} from "../redux/userSlice.js";
import {signOut} from "firebase/auth";
import {auth} from "../firebase.js";
import {LogoutOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {setTheme} from "../redux/appSlice.js";
import Logo from "/woman.png";


const Navbar = () => {
    const dispatch = useDispatch();

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return JSON.parse(localStorage.getItem('theme')) || false;
    });

    const handleClick = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const navigate = useNavigate();

    const handleLogout = async () => {
        dispatch(logout());  // Clear user data from Redux state
        await signOut(auth);  // Sign out from Firebase
        navigate('/login');  // Redirect to login page after logout
    };


    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(isDarkMode));
        dispatch(setTheme(isDarkMode));
    }, [isDarkMode]);

    return (
        <>
            <nav className={isDarkMode ? "tw-bg-[#7fafef]" : "tw-bg-blue-100"}>
                <div className="tw-mx-auto tw-max-w-7xl tw-px-2 tw-sm:px-6 tw-lg:px-8">
                    <div className="tw-flex tw-h-20 tw-items-center tw-justify-between">
                        <div className="tw-w-[75%]  sm:tw-w-[25%]">
                            <h1 className="tw-text-white tw-text-2xl tw-font-bold">
                                <a href="/">React Timeline</a>
                            </h1>
                        </div>
                        <div
                            className="tw-hidden sm:tw-flex tw-flex-1 tw-items-center tw-justify-center tw-md:items-stretch tw-md:justify-start tw-w-[50%]">
                            <div className="tw-md:ml-auto">
                                <div className="tw-flex tw-space-x-2">
                                    <img src={Logo} className="tw-w-[50px]" alt={'Logo'}/>
                                </div>
                            </div>
                        </div>
                        <div className="tw-w-[25%] tw-flex tw-justify-end tw-gap-4">
                            <Button icon={isDarkMode ? "🌞" : "🌙"} onClick={handleClick}/>
                            <Tooltip placement="top" title="Logout?">
                                <Button icon={<LogoutOutlined/>} className="tw-mr-2" onClick={handleLogout}/>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
