interface Props {
    level: AlertLevel;
    children: React.ReactNode;
}

export type AlertLevel = keyof typeof styles;

const styles = {
    danger: 'bg-red-100 text-red-700',
    warning: 'bg-orange-100 text-orange-700',
    success: 'bg-green-100 text-green-700',
}

export function Alert({ level, children }: Props) {
    return <div className={`rounded-lg py-2 px-3 text-xs ${styles[level]}`} role="alert">
        {children}
    </div>;
}