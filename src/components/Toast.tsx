import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning';
}

export function Toast({ message, type }: ToastProps) {
  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-600',
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-600',
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-600',
    },
  };

  const { icon: Icon, bgColor, borderColor, textColor, iconColor } = config[type];

  return (
    <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top duration-300">
      <div className={`${bgColor} ${borderColor} border rounded-xl px-4 py-3 shadow-lg flex items-center gap-3 min-w-[280px] max-w-md`}>
        <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
        <p className={`${textColor}`}>{message}</p>
      </div>
    </div>
  );
}
