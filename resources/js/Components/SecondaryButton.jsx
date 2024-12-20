export default function SecondaryButton({
    type = 'button',
    className = '',
    action,
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            onClick={() => action()}
            type={type}
            className={
                `inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-25 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
