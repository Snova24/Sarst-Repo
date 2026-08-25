type ToastProps = {
  message: string | null;
};

export function Toast({ message }: ToastProps) {
  return (
    <div className="toast-region" aria-live="polite" aria-atomic="true" role="status">
      {message ? <p className="toast">{message}</p> : null}
    </div>
  );
}
