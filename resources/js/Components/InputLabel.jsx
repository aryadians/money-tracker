export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label
            {...props}
            // UBAH DISINI: Ganti `text-gray-700` menjadi `text-gray-300`
            className={`block font-medium text-sm text-gray-300 ` + className}
        >
            {value ? value : children}
        </label>
    );
}
