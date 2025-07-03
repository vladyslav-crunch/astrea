import {useEffect, useRef, useState} from "react";
import styles from "./color-picker.module.css";
import ColorPickerIcon from "../../../public/icons/topic/color-picker.svg?react";


const colorOptions = [
    "#d9c8ff", "#f9d5ec", "#c9f3ff",
    "#ffe0cc", "#f6ffc8", "#ccf7d4",
    "#ffcccb", "#e0bbff", "#cce0ff"
];

type ColorPickerProps = {
    value?: string;
    onChange?: (color: string) => void;
};

export default function ColorPicker({value = "#d9c8ff", onChange}: ColorPickerProps) {
    const [selectedColor, setSelectedColor] = useState(value);
    const [open, setOpen] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={styles.pickerWrapper} ref={pickerRef}>
            <button
                type="button"
                className={styles.selectedColor}
                style={{backgroundColor: selectedColor}}
                onClick={() => setOpen(!open)}
            >
                <ColorPickerIcon style={{height: 20, width: 20}}/>
            </button>
            {open && (
                <div className={styles.grid}>
                    {colorOptions.map((color) => (
                        <button
                            key={color}
                            type="button"
                            className={`${styles.color} ${color === selectedColor ? styles.active : ""}`}
                            style={{backgroundColor: color}}
                            onClick={() => {
                                setSelectedColor(color);
                                onChange?.(color);
                                setOpen(false);
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
