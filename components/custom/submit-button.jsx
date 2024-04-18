import { Loader, CircleCheck } from 'lucide-react';
import { Button } from '../ui/button';

export default function SubmitButton({ childern, disabled, loading, success, size }) {
  return (
    <Button
      type="submit"
      size={size || ''}
      disabled={disabled || loading}
      className={`duration-700 ${
        success
          ? 'bg-green-500/30 focus:bg-green-500/30 hover:bg-green-500/30 text-green-500'
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