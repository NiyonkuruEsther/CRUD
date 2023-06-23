import { PropsWithChildren, LabelHTMLAttributes } from 'react'

const Label = ({
    className,
    children,
    ...props
}: PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>) => (
    <label {...props} className={`block font-medium text-md` + className}>
        {children}
    </label>
)

export default Label
