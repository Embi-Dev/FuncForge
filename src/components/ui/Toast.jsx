"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

let toastId = 0
const toasts = []
const listeners = []

export function toast({ title, description, variant = "default" }) {
  const id = toastId++
  const newToast = { id, title, description, variant }

  toasts.push(newToast)
  listeners.forEach((listener) => listener([...toasts]))

  setTimeout(() => {
    const index = toasts.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.splice(index, 1)
      listeners.forEach((listener) => listener([...toasts]))
    }
  }, 5000)
}

export function ToastContainer() {
  const [toastList, setToastList] = useState([])

  useEffect(() => {
    listeners.push(setToastList)
    return () => {
      const index = listeners.indexOf(setToastList)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  const removeToast = (id) => {
    const index = toasts.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.splice(index, 1)
      setToastList([...toasts])
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse space-y-0 space-y-reverse space-y-2">
      {toastList.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg border p-4 shadow-lg max-w-sm bg-white border-gray-200 ${
            toast.variant === "destructive" ? "border-red-200 bg-red-50" : ""
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{toast.title}</h4>
              {toast.description && <p className="text-sm text-gray-600 mt-1">{toast.description}</p>}
            </div>
            <button onClick={() => removeToast(toast.id)} className="ml-2 text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
