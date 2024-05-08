import { Loader } from 'lucide-react';
import { Button } from '../ui/button';
import { useFormStatus } from 'react-dom';
import Dots from './loader/dots';

export default function SubmitButton({ childern, size, className, disabled, ...props }) {
  const { pending } = useFormStatus();
  return (
    <Button
      size={size}
      disabled={disabled || pending}
      className={`font-jbmono ${className}`}
      {...props}
    >
      {pending ? <Dots className="animate-spin" /> : [childern]}
    </Button>
  );
}
