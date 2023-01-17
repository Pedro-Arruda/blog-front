import { toast, ToastOptions } from 'react-toastify';

export const infoToast = (
  message: string,
  description?: string,
  options?: ToastOptions,
) =>
  toast.info(
    <>
      <p className="body4">{message}</p>
      {description && <span className="body4">{description}</span>}
    </>,
    {
      position: 'bottom-right',
      theme: 'colored',
      style: {
        background: 'var(--primary)',
      },
      ...options,
    },
  );

export const successToast = (
  message: string,
  description?: string,
  options?: ToastOptions,
) =>
  toast.success(
    <>
      <p className="body4">{message}</p>
      {description && <span className="body4">{description}</span>}
    </>,
    {
      position: 'bottom-right',
      theme: 'colored',
      style: {
        background: 'var(--success)',
      },
      ...options,
    },
  );

export const warnToast = (
  message: string,
  description?: string,
  options?: ToastOptions,
) =>
  toast.warning(
    <>
      <p className="body4">{message}</p>
      {description && <span className="body4">{description}</span>}
    </>,
    {
      position: 'bottom-right',
      theme: 'colored',
      style: {
        background: 'var(--warning)',
        color: 'var(--text)',
      },
      ...options,
    },
  );

export const errorToast = (
  message: string,
  description?: string,
  options?: ToastOptions,
) =>
  toast.error(
    <>
      <p className="body4">{message}</p>
      {description && <span className="body4">{description}</span>}
    </>,
    {
      position: 'bottom-right',
      theme: 'colored',
      style: {
        background: 'var(--error)',
      },
      ...options,
    },
  );
