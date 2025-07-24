import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@headlessui/react";
import {Check, ChevronDown} from "lucide-react";
import styles from "./select.module.css";

type Option = {
    label: string;
    value: string | number;
};

type CustomSelectProps = {
    value: string | number;
    onChange: (value: string | number) => void;
    options: Option[];
    label?: string;
};

const Select = ({value, onChange, options, label}: CustomSelectProps) => {
    const selected = options.find((opt) => opt.value === value);

    return (
        <div className={styles.wrapper}>
            <Listbox value={value} onChange={onChange}>
                <div className={styles.container}>
                    <ListboxButton className={styles.button}>
                        <span className={styles.labelText}>{label}</span>
                        <span className={styles.valueText}>{selected?.label}</span>
                        <ChevronDown className={styles.icon} size={16}/>
                    </ListboxButton>

                    <ListboxOptions className={styles.options}>
                        {options.map((option) => (
                            <ListboxOption
                                key={option.value}
                                value={option.value}
                                className={({focus, selected}) =>
                                    `${styles.option} ${focus ? styles.active : ""} ${selected ? styles.selected : ""}`
                                }
                            >
                                {({selected}) => (
                                    <div className={styles.optionContent}>
                                        <span>{option.label}</span>
                                        {selected && <Check size={16}/>}
                                    </div>
                                )}
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>
            </Listbox>
        </div>
    );
};

export default Select;
