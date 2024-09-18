import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Card, DatePicker, Popconfirm, Spin, Tag, Timeline} from "antd";
import TextArea from "antd/es/input/TextArea.js";
import {db} from "../firebase.js";
import {addDoc, collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {toast} from "react-toastify";
import moment from "moment";
import {DeleteOutlined, LoadingOutlined} from "@ant-design/icons";
import EditModel from "../components/EditModel.jsx";


const Home = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.userStore.user);
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");
    const [error, setError] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentTodo, setCurrentTodo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const isDarkMode = useSelector((state) => state.appStore.theme);


    const handleDelete = async (todo) => {
        if (!user || deleting) {
            return;
        }
        setDeleting(true);
        setCurrentTodo(todo);
        if (currentTodo) {
            // console.log("Deleting todo: ", currentTodo);
            const todoRef = doc(db, "todos", currentTodo.id);
            await deleteDoc(todoRef)
                .then(() => {
                    toast("Todo deleted successfully");
                }).catch(
                    (e) => {
                        console.error("Error deleting document: ", e);
                        toast.error("Error deleting Todo");
                    }
                );
            await fetchPost();
        }
        setDeleting(false);
    }

    const addTodo = async (e) => {
        e.preventDefault();
        if (!user) {
            return;
        }

        if (todo.length < 5) {
            setError("Todo must be at least 5 characters long");
            return;
        }

        setError("");
        setSubmitting(true);
        try {
            console.log(JSON.stringify(user))
            await addDoc(collection(db, 'todos'), {
                todo: todo,
                timestamp: selectedDate.toDate(),
                user: user ? user : 'Unknown'
            });
            setTodo("");
            setSelectedDate(null);
            toast("Todo added successfully");
            await fetchPost()
        } catch (e) {
            console.error("Error adding document: ", e);
            toast.error("Error adding Todo");
        } finally {
            setSubmitting(false);
        }
    }

    const fetchPost = async () => {
        if (!user) {
            return;
        }
        setLoading(true);
        try {
            await getDocs(collection(db, "todos"))
                .then((querySnapshot) => {
                    console.log("Fetching todos: ", querySnapshot.docs.map((doc) => doc.data()));
                    const newData = querySnapshot.docs
                        .map((doc) => ({...doc.data(), id: doc.id}))
                        .sort((a, b) => b.timestamp - a.timestamp)
                    setTodos(newData);
                })
        } catch (e) {
            console.error("Error fetching document: ", e.message);
            toast.error("Error fetching Todo");
        } finally {
            {
                setLoading(false);

            }
        }
    }

    useEffect(() => {
        fetchPost();
    }, [])

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <>
            <div className={isDarkMode ? "tw-bg-black" : "tw-bg-white"}>
                <div className="tw-flex tw-justify-center tw-items-center">
                    <div className="tw-w-[80%]  sm:tw-w-full tw-max-w-lg tw-shadow-lg tw-mt-6">
                        <Card>
                            <h1>Please write down the special moment ✨</h1>
                            <TextArea
                                placeholder="Use your brain 🧠"
                                autoSize={{minRows: 2, maxRows: 7}}
                                onChange={(e) => setTodo(e.target.value)}
                                value={todo}
                                status={error ? "error" : "valid"}
                            />
                            {error && <p style={{color: "red"}}>{error}</p>}

                            <DatePicker
                                className="tw-w-full tw-mt-3"
                                onChange={(date) => setSelectedDate(date)}
                                value={selectedDate}
                                placeholder="Date of the precious moment 📅"
                            />
                            <Button type="primary" className="tw-mt-3" onClick={addTodo}
                                    loading={submitting}>Submit</Button>
                        </Card>
                    </div>
                </div>
                <div className="tw-flex tw-justify-center tw-items-center tw-flex-col tw-mt-[20px]">
                    {
                        loading ?
                            <Spin indicator={<LoadingOutlined spin/>} size="large"/>
                            :
                            <div className="tw-w-[80%] sm:tw-w-1/2">
                                <Timeline mode="alternate">
                                    {todos && todos.map((item) => (
                                        <Timeline.Item key={item.id}
                                                       label={item.timestamp ? moment(item.timestamp.toDate()).format('YYYY-MM-DD') : 'No timestamp available'}
                                        >
                                            <div
                                                className={isDarkMode ? " tw-p-4  tw-shadow-[10px_15px_10px_-07px_rgba(255,255,255,0.3)] tw-flex tw-items-start tw-flex-col" : " tw-p-4  tw-rounded-md tw-flex tw-shadow-md tw-items-start tw-flex-col"}>
                                                <div
                                                    className={isDarkMode ? "tw-mb-2 !tw-text-white !tw-bg-black tw-border tw-p-1 tw-rounded-md !tw-border-purple-600 tw-w-full tw-flex" : "tw-mb-2 !tw-text-zinc-950 !tw-bg-white tw-border tw-p-1 tw-rounded-md !tw-border-purple-600 tw-w-full tw-flex"}>
                                                    <p>
                                                        {item.todo}
                                                    </p>
                                                </div>
                                                <div className="tw-mb-2 ">
                                                    {
                                                        item.user === 'Talha' ?
                                                            <Tag color="gold">   {item.user}</Tag> :
                                                            <Tag color="cyan">   {item.user}</Tag>
                                                        // <Tag color="cyan"> Adnan</Tag>
                                                    }
                                                </div>
                                                <div className="tw-flex tw-gap-1 tw-mt-1">
                                                    <EditModel item={item} onItemEdit={fetchPost}/>
                                                    <Popconfirm title="Are you sure？"
                                                                onConfirm={() => handleDelete(item)}
                                                                okText="Yes 😖"
                                                                cancelText="No">
                                                        <Button
                                                            icon={<DeleteOutlined
                                                                className="tw-text-red-600"/>}/>
                                                    </Popconfirm>
                                                </div>
                                            </div>
                                        </Timeline.Item>
                                    ))}
                                </Timeline>
                            </div>
                    }
                </div>
            </div>

        </>
    );
}

export default Home;
