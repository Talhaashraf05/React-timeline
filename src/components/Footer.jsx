import Timer from "./Timer.jsx";
import {useSelector} from "react-redux";

const Footer = () => {
    const isDarkMode = useSelector((state) => state.appStore.theme);

    return (
        <>
            <div
                className={isDarkMode ? "tw-p-5 tw-bg-[#7fafef] tw-flex tw-flex-col tw-items-center" : "tw-p-5 tw-bg-blue-100 tw-flex tw-flex-col tw-items-center"}>
                <h1 className="tw-text-center  tw-text-[#2f4f4f]">
                    Since this project started
                </h1>
                <Timer/>
            </div>
            <div
                className={isDarkMode ? "tw-flex tw-justify-center tw-items-center tw-h-[50px] tw-bg-black tw-text-amber-50" : "tw-flex tw-justify-center tw-items-center tw-h-[50px] "}>
                <h1>
                    Made with ❤️ by{' '}
                    <a href="https://talhas.netlify.app/">Talha Ashraf</a>
                </h1>
            </div>
        </>
    )
}

export default Footer;