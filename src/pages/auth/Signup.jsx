import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {auth} from "../../firebase.js";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/userSlice.js";
import {Button, Card, Form, Input, Typography} from "antd";
import woman from "/woman.png";
import {toast} from "react-toastify";

const {Title} = Typography;

const Signup = () => {
    const isDarkMode = useSelector((state) => state.appStore.theme);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.userStore.user);

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);
    
    const onSignup = async (values) => {
        setLoading(true);
        const {username, email, password} = values;

        try {
            // Create the user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Update the user's profile with the username
            await updateProfile(user, {displayName: username});
            // Notify success
            toast("Your account has been successfully created");
            // Dispatch login action with the updated displayName
            dispatch(login(user.displayName));
            // Navigate to the home page
            navigate("/");
        } catch (error) {
            // Handle both createUser and updateProfile errors
            toast(`Error: ${error.message}`);
            console.error("Error Code:", error.code, "Message:", error.message);
        } finally {
            // Ensure loading state is turned off after operation completes or fails
            setLoading(false);
        }
    };

    return (
        <div
            className={isDarkMode ? "tw-flex tw-justify-center tw-flex-col tw-items-center tw-h-screen tw-bg-black" : "tw-flex tw-justify-center tw-flex-col tw-items-center tw-h-screen tw-bg-white "}>
            <div>
                <img src={woman} className="tw-w-[100px]" alt={'Logo'}/>
            </div>
            <Card className="tw-w-full tw-max-w-md tw-shadow-lg">
                <Title level={3} className="tw-text-center">Signup 🧞‍♂️</Title>
                <Form
                    name="signup"
                    onFinish={onSignup}
                    className="tw-space-y-4"
                    layout="vertical"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{required: true, message: 'Please input your email!'}]}
                    >
                        <Input
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="tw-w-full"
                            loading={loading}
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                <div className="tw-w-full tw-flex tw-justify-center tw-mt-5">
                    <h2>
                        Already have an account? <a className="tw-text-purple-300 hover:tw-text-purple-500"
                                                    href="/login">Login</a>
                    </h2>
                </div>
            </Card>
        </div>
    );
};

export default Signup;
