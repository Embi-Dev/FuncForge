import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { createPortal } from "react-dom"

export function Select({ value, onValueChange, children }) {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="relative" ref={selectRef}>
            {children.map((child) => {
                if (child.type === SelectTrigger) {
                    return {
                        ...child,
                        props: {
                        ...child.props,
                        onClick: () => setIsOpen(!isOpen),
                        isOpen,
                        value,
                        },
                    }
                }
                if (child.type === SelectContent) {
                    return {
                        ...child,
                        props: {
                            ...child.props,
                            isOpen,
                            onSelect: (selectedValue) => {
                                onValueChange(selectedValue)
                                setIsOpen(false)
                            },
                        },
                    }
                }
                return child
            })}
        </div>
    )
}

export function SelectTrigger({ className = "", children, onClick, isOpen, value, ...props }) {
    return (
        <button
        type="button"
        className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 focus:ring-blue-500 ${className}`}
        onClick={onClick}
            {...props}
        >
            <span>{value || children}</span>
            <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
    )
}

export function SelectValue({ placeholder }) {
    return <span className="text-muted-foreground">{placeholder}</span>
}

export function SelectContent({ className = "", children, isOpen, onSelect }) {
    if (!isOpen) return null

    return (
        <div
            className={`absolute top-full left-0 z-50 w-full mt-1 rounded-md border bg-popover p-1 text-popover-foreground shadow-md border-gray-300 bg-white ${className}`}
        >
            {children.map((child, index) => {
                if (child.type === SelectItem) {
                    return {
                        ...child,
                        key: index,
                        props: {
                        ...child.props,
                        onSelect,
                        },
                    }
                }
                return child
            })}
        </div>
    )
    }

export function SelectItem({ className = "", children, value, onSelect, ...props }) {
    return (
        <div
            className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground hover:bg-gray-100 cursor-pointer ${className}`}
            onClick={() => onSelect(value)}
            {...props}
        >
            {children}
        </div>
    )
}
export const CustomDropdown = ({ 
    options, 
    value, 
    onChange, 
    placeholder,
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width
        });
        }
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
        if (triggerRef.current && !triggerRef.current.contains(e.target) &&
            (!dropdownRef.current || !dropdownRef.current.contains(e.target))) {
            setIsOpen(false);
        }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`}>
            <div
                ref={triggerRef}
                onClick={toggleDropdown}
                className={`flex items-center justify-between w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 bg-white cursor-pointer transition-colors ${
                isOpen 
                    ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-white" 
                    : "hover:border-gray-400 focus:border-blue-500"
                }`}
            >
                <span className={`truncate ${!value ? "text-gray-400" : ""}`}>
                    {value || placeholder}
                </span>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? "rotate-180" : ""}`}
                >
                <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>

            {isOpen && createPortal(
                <div 
                    ref={dropdownRef}
                    className="absolute z-50 bg-white border border-gray-300 rounded-md shadow-md overflow-hidden py-1"
                    style={{
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                        width: `${position.width}px`,
                        maxHeight: "15rem"
                    }}
                >
                    <div className="overflow-auto max-h-60">
                        {options.map((option) => (
                        <div
                            key={option}
                            className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 ${
                            value === option ? "text-blue-600" : ""
                            }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleOptionClick(option);
                            }}
                        >
                            {value === option && (
                                <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                    >
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </span>
                            )}
                            {option}
                        </div>
                        ))}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};