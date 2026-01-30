import { useState, forwardRef, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";
import styles from "./date-picker.module.css";
import "./data-picker-rules.css";
import { CalendarDays } from "lucide-react";

type DatePickerProps = {
  value?: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
};

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ value, onChange, placeholder }, ref) => {
    const [selected, setSelected] = useState(
      value ? new Date(value) : undefined,
    );
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (date: Date | undefined) => {
      setSelected(date);
      onChange(date ? date.toISOString() : null);
      setOpen(false);
    };

    return (
      <div ref={wrapperRef} className={styles.wrapper}>
        <input
          type="text"
          readOnly
          ref={ref}
          value={selected ? format(selected, "dd.MM.yyyy") : ""}
          onClick={() => setOpen(!open)}
          placeholder={placeholder || "Select a date"}
          className={styles.input}
        />
        <span className={styles.icon} onClick={() => setOpen(!open)}>
          <CalendarDays size={20} strokeWidth={1.6} />
        </span>
        {open && (
          <div className={styles.popover}>
            <DayPicker
              mode="single"
              selected={selected}
              showOutsideDays={true}
              onSelect={handleSelect}
              animate={true}
              className={styles.daypicker}
            />
          </div>
        )}
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";
export default DatePicker;
