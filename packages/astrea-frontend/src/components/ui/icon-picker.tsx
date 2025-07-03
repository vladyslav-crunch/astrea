import styles from './icon-picker.module.css';
import {useEffect, useRef, useState} from "react";

interface IconPickerProps {
    value: string;
    onChange: (icon: string) => void;
}

const iconOptions = ['📚', '🎯', '🏋️‍♀️', '🧠', '💻', '✈️', '📈', '🎨', '🎵'];

export default function IconPicker({value, onChange}: IconPickerProps) {
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
                className={styles.selectedIcon}
                onClick={() => setOpen(!open)}
            >
                {value}
            </button>

            {open && (
                <div className={styles.grid}>
                    {iconOptions.map((icon) => (
                        <button
                            key={icon}
                            type="button"
                            className={`${styles.icon} ${icon === value ? styles.active : ''}`}
                            onClick={() => {
                                onChange(icon);
                                setOpen(false);
                            }}
                        >
                            {icon}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
