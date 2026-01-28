import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const localRef = useRef(null);
    const inputRef = ref ? ref : localRef;

    useEffect(() => {
        if (isFocused) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                // UBAH DISINI: Style Dark Mode (bg-gray-900, text-white, border-gray-700)
                'border-gray-700 bg-gray-900 text-white focus:border-blue-500 focus:ring-blue-500 rounded-xl shadow-sm ' +
                className
            }
            ref={inputRef}
        />
    );
});