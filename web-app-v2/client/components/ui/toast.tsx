import * as React from "react"

export interface ToastProps {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactElement
  open: boolean
  onOpenChange: (open: boolean) => void
}

export type ToastActionElement = React.ReactElement

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  action,
  open,
  onOpenChange,
}) => {
  return (
    <div role="alert" aria-live="assertive" aria-atomic="true">
      {open && (
        <div>
          {title && <div>{title}</div>}
          {description && <div>{description}</div>}
          {action}
          <button onClick={() => onOpenChange(false)}>Close</button>
        </div>
      )}
    </div>
  )
}

