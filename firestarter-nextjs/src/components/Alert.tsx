


interface Props {
    level: 'danger';
    children: React.ReactNode;
}

const styles = {
    danger: 'bg-red-100 text-red-700'
}

export function Alert({ level, children }: Props) {
    return <div className={`rounded-lg py-2 px-3 text-xs mb-3 ${styles[level]}`} role="alert">
        {children}
    </div>;
}