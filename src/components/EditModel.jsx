import {Button, DatePicker, Modal} from "antd";
import TextArea from "antd/es/input/TextArea.js";
import {useState} from "react";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase.js";
import {toast} from "react-toastify";
import dayjs from "dayjs";
import {EditOutlined} from "@ant-design/icons";

const EditModel = ({item, onItemEdit}) => {

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);
    const [newTodo, setNewTodo] = useState("");
    const [newDate, setNewDate] = useState(null);


    const showEditModal = (item) => {
        setCurrentTodo(item);
        setNewTodo(item.todo);
        setNewDate(item.timestamp);
        setIsEditModalOpen(true);
    };

    const handleEdit = async () => {
        if (currentTodo) {
            try {
                const todoRef = doc(db, "todos", currentTodo.id);
                await updateDoc(todoRef, {
                    todo: newTodo,
                    timestamp: newDate.toDate()
                });
                onItemEdit();
                toast("Todo updated successfully");
            } catch (e) {
                console.error("Error updating document: ", e);
                toast.error("Error updating Todo");
            }
        }
        setIsEditModalOpen(false);
    };
    const handleCancel = () => {
        setIsEditModalOpen(false);
    };


    return (
        <>

            <Button onClick={() => showEditModal(item)} icon={<EditOutlined className="tw-text-purple-600"/>}/>


            <Modal title="Oops😗, Let's Edit" open={isEditModalOpen} onOk={handleEdit} onCancel={handleCancel}>
                <TextArea
                    placeholder="Edit your todo"
                    autoSize={{minRows: 2, maxRows: 7}}
                    onChange={(e) => setNewTodo(e.target.value)}
                    value={newTodo}
                />
                <DatePicker
                    className="tw-w-full tw-mt-3"
                    onChange={(date) => setNewDate(date)}
                    value={newDate ? dayjs(newDate.toDate()) : null}
                    placeholder="Select a date"
                />
            </Modal>
        </>
    );
}

export default EditModel;