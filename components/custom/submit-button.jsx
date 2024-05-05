import { Loader, CircleCheck } from 'lucide-react';
import { Button } from '../ui/button';

export default function SubmitButton({
  childern,
  disabled,
  loading,
  success,
  size,
  className,
  ...props
}) {
  return (
    <Button
      size={size || ''}
      disabled={disabled || loading}
      className={`duration-700 ${
        success
          ? 'bg-neutral-500/30 focus:bg-neutral-500/30 hover:bg-neutral-500/30 bg-neutral-500'
          : ''
      } ${className}`} {...props}
    >
      {loading ? (
        <Loader className="h-6 w-6 animate-spin" />
      ) : success ? (
        <CircleCheck className="h-6 w-6" />
      ) : (
        [childern]
      )}
    </Button>
  );
}
