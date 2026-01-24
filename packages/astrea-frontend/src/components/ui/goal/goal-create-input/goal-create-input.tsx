import {useState} from "react";
import Input, {INPUT_OPTION_CLASSES} from "../../common/input/input.tsx";

type GoalInputProps = {
    onCreate: (title: string) => void;
};

function GoalCreateInput({onCreate}: GoalInputProps) {
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
            option={INPUT_OPTION_CLASSES.tabs}
            type="text"
            placeholder="+ Add new goal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyPress}
        />
    );
}

export default GoalCreateInput;
