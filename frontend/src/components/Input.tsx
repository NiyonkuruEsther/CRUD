import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    InputHTMLAttributes,
} from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean
    isFocused?: boolean
}

export default forwardRef(function Input(
    { disabled = false, className = '', isFocused = false, ...props }: Props,
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }))

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus()
        }
    }, [])

    return (
        <input
            {...props}
            disabled={disabled}
            className={
                'focus:ring-2 focus:ring-yellow-400 focus:border-none rounded-md shadow-sm ' +
                className
            }
            ref={localRef}
        />
    )
})
