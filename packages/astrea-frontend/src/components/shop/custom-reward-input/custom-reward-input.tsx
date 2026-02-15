import { useState } from "react";
import Input, { INPUT_OPTION_CLASSES } from "../../ui/common/input/input";

interface CustomRewardInputProps {
  onCreate: (title: string, coins: number) => void;
}

function CustomRewardInput({ onCreate }: CustomRewardInputProps) {
  const [title, setTitle] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = title.trim();
      if (trimmed) {
        onCreate(trimmed, 10); // Default 10 coins
        setTitle("");
      } else {
        // Create with default title if empty
        onCreate("Custom reward", 10);
        setTitle("");
      }
    }
  };

  return (
    <Input
      option={INPUT_OPTION_CLASSES.kanban}
      type="text"
      placeholder="+ Add custom reward"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onKeyDown={handleKeyPress}
    />
  );
}

export default CustomRewardInput;
