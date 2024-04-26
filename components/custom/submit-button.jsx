import { Loader, CircleCheck } from 'lucide-react';
import { Button } from '../ui/button';

export default function SubmitButton({
  childern,
  disabled,
  loading,
  success,
  size,
}) {
  return (
    <Button
      type="submit"
      size={size || ''}
      disabled={disabled || loading}
      className={`duration-700 ${
        success
          ? 'bg-neutral-500/30 focus:bg-neutral-500/30 hover:bg-neutral-500/30 bg-neutral-500'
          : ''
      }`}
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
