import {useState} from "react";
import Input, {INPUT_OPTION_CLASSES} from "../common/input/input.tsx";


type TaskInputProps = {
    onCreate: (title: string) => void;
};

function TaskCreateInput({onCreate}: TaskInputProps) {
    const [title, setTitle] = useState("");

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const trimmed = title.trim();
            if (trimmed) {
                onCreate(trimmed);
                setTitle("");
            }
        }
    };

    return (
        <Input
            option={INPUT_OPTION_CLASSES.kanban}
            type="text"
            placeholder="+ Add new Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyPress}
        />
    );
}

export default TaskCreateInput;
