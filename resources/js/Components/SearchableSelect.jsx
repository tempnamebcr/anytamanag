import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export default forwardRef(function SearchableSelectInput(
    { options = [], className = "", isFocused = false, selectParent, placeholder = "Caută...", ...props },
    ref
) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const inputRef = useRef(null);
    const selectRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            inputRef.current?.focus();
        }
    }, [isFocused]);

    useEffect(() => {
        setFilteredOptions(
            options.filter((option) =>
                option.label.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, options]);

    useEffect(() => {
        options.forEach((option) => {
            if (option.selected) {
                setSearchTerm(option.label);
                if (selectRef.current) {
                    selectRef.current.value = option.value;
                }
                setIsOpen(false);
            }
        });
    }, []);

    return (
        <div className={"relative w-full " + className}>
            <input
                {...props}
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                autoComplete="off"
                onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);

                    if (value === "") {
                        selectParent("")
                    }
                }}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
            />

            {isOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-40 overflow-auto">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <li
                                key={option.value}
                                className="px-3 py-2 hover:bg-indigo-100 cursor-pointer"
                                onMouseDown={() => {
                                    selectParent(option.value)
                                    setSearchTerm(option.label);
                                    selectRef.current.value = option.value;
                                    setIsOpen(false);
                                }}
                            >
                                {option.label}
                            </li>
                        ))
                    ) : (
                        <li className="px-3 py-2 text-gray-500">Nicio opțiune găsită</li>
                    )}
                </ul>
            )}

            <select ref={selectRef} {...props} className="hidden">
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
});
