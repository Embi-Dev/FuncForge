import { createPortal } from "react-dom"
import { AlertTriangle } from "lucide-react"
import { forwardRef } from "react"

export const AlertDialog = ({ 
    open, 
    onOpenChange, 
    children 
}) => {
    if (!open) return null

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative z-50 grid w-full max-w-lg gap-4 rounded-lg p-6">
                {Array.isArray(children) ? children : [children]}
            </div>
        </div>,
        document.body
    )
}

export const AlertDialogContent = forwardRef(({ 
    className = "", 
    children, 
    ...props 
}, ref) => {
    return (
        <div
            ref={ref}
            className={`relative z-50 grid w-full max-w-lg gap-4 rounded-lg bg-white p-6 shadow-lg ${className}`}
            {...props}
        >
            {children}
        </div>
    )
})

export const AlertDialogHeader = forwardRef(({ 
    className = "", 
    children, 
    ...props 
}, ref) => {
    return (
        <div
            ref={ref}
            className={`flex flex-col space-y-2 text-center sm:text-left ${className}`}
            {...props}
        >
            {children}
        </div>
    )
})

export const AlertDialogFooter = forwardRef(({ 
    className = "", 
    children, 
    ...props 
}, ref) => {
    return (
        <div
            ref={ref}
            className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}
            {...props}
        >
            {children}
        </div>
    )
})

export const AlertDialogTitle = forwardRef(({ 
    className = "", 
    children, 
    ...props 
}, ref) => {
    return (
        <h2
            ref={ref}
            className={`text-lg font-semibold flex items-center gap-2 ${className}`}
            {...props}
        >
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            {children}
        </h2>
    )
})

export const AlertDialogDescription = forwardRef(({ 
    className = "", 
    children, 
    ...props 
}, ref) => {
    return (
        <p
            ref={ref}
            className={`text-sm text-gray-600 ${className}`}
            {...props}
        >
            {children}
        </p>
    )
})

export const AlertDialogAction = forwardRef(({ 
    className = "", 
    children, 
    ...props 
}, ref) => {
    return (
        <button
            ref={ref}
            className={`inline-flex items-center justify-center rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 ${className}`}
            {...props}
        >
            {children}
        </button>
    )
})

export const AlertDialogCancel = forwardRef(({ 
    className = "", 
    children, 
    ...props 
}, ref) => {
    return (
        <button
            ref={ref}
            className={`mt-2 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 sm:mt-0 ${className}`}
            {...props}
        >
            {children}
        </button>
    )
})

AlertDialogContent.displayName = "AlertDialogContent"
AlertDialogHeader.displayName = "AlertDialogHeader"
AlertDialogFooter.displayName = "AlertDialogFooter"
AlertDialogTitle.displayName = "AlertDialogTitle"
AlertDialogDescription.displayName = "AlertDialogDescription"
AlertDialogAction.displayName = "AlertDialogAction"
AlertDialogCancel.displayName = "AlertDialogCancel"