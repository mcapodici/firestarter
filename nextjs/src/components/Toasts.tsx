import { max } from "@/common/util";
import { Key, useCallback, useState } from "react";
import { Alert, AlertLevel } from "./Alert";

export interface Toast {
  message: string;
  level?: AlertLevel;
  id: number;
  removed: boolean;
  tag?: string;
}

export interface ToastsProps {
  toasts: Toast[];
}

export interface ToastProps {
  key?: Key | undefined | null;
  show: boolean;
  children?: React.ReactNode;
}

export const Toasts = ({ toasts }: ToastsProps) => (
  <div className="grid gap-1">
    {toasts?.map((t) => (
      <Alert key={t.id} level={t.level || "success"}>
        <p>{t.message}</p>
      </Alert>
    ))}
  </div>
);

export type ToastAdder = (
  message: string,
  level?: AlertLevel,
  tag?: string,
  removeOthersWithTag?: boolean
) => void;

export const useToasts = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const timeOut = 10000;
  const animationTime = 150;

  const addToast = useCallback(
    (
      message: string,
      level?: AlertLevel,
      tag?: string,
      removeOthersWithTag?: boolean
    ) => {
      // Add toast with unique id
      setToasts((toasts) => {
        const id = toasts.length === 0 ? 0 : max(toasts.map((t) => t.id)) + 1;

        // Remove toast after 10 seconds
        setTimeout(() => {
          setToasts((t) =>
            t.map((t) => (t.id === id ? { ...t, removed: true } : t))
          );
        }, timeOut);
        setTimeout(() => {
          setToasts((t) => t.filter((t) => t.id !== id));
        }, timeOut + animationTime);

        return [
          ...toasts.filter((t) => !removeOthersWithTag || t.tag !== tag),
          { message, level, id, tag, removed: false },
        ];
      });
    },
    [setToasts]
  );

  return [toasts, addToast] as [Toast[], ToastAdder];
};
