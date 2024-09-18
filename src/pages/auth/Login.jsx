import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {auth} from "../../firebase.js";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Form, Input, Typography} from "antd";
import {toast} from "react-toastify";
import woman from "/woman.png";
import {login} from "../../redux/userSlice.js";

const {Title} = Typography;

const Login = () => {
    const isDarkMode = useSelector((state) => state.appStore.theme);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.userStore.user);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const onLogin = async (values) => {
        const {email, password} = values;
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                toast.success(`You are successfully logged in`);
                const user = userCredential.user;
                // console.log("User without string", user);
                // console.log("User without string", user.toString());
                dispatch(login(user.displayName));
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.code === "auth/invalid-credential" ? "Please enter the correct email and password" : error.message);
                // console.log(error.code, error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div
            className={isDarkMode ? "tw-flex tw-justify-center tw-flex-col tw-items-center tw-h-screen tw-bg-black" : "tw-flex tw-justify-center tw-flex-col tw-items-center tw-h-screen tw-bg-white "}>
            <div>
                <img src={woman} className="tw-w-[100px]" alt={'Logo'}/>
            </div>
            <Card className=" sm:tw-w-full tw-max-w-md tw-shadow-lg">
                <Title level={3} className="tw-text-center">LOGIN 🗝️</Title>
                <Form
                    name="login"
                    onFinish={onLogin}
                    className="tw-space-y-4"
                    layout="vertical"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{required: true, message: 'Please input your email!'}]}
                    >
                        <Input
                            placeholder="Email"
                            // onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password
                            placeholder="Password"
                            // onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="tw-w-full"
                            loading={loading}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <div className="tw-w-full tw-flex tw-justify-center tw-mt-5">
                    <h2>
                        Don&apos;t have an account? <a href="/signup">Sign up</a>
                    </h2>
                </div>
            </Card>
        </div>
    );
};

export default Login;
