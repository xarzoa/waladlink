'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader, CircleCheck } from 'lucide-react';
import { signInAction } from '@/app/auth/action';

const FormSchema = z.object({
  email: z.string().email(),
});

export default function Authentication() {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data) {
    setLoading(true);
    const toastId = toast.loading('Seding the Magic-Link...');
    try {
      const res = await signInAction(data);
      toast[res.type](res.message, { id: toastId });
      if (res.type === 'success') {
        form.reset();
      }
    } catch (e) {
      toast.error('Something went wrong.', { id: toastId })
    }
    setLoading(false);
    setTimeout(() => {
      setDisabled(false);
    }, 30000);
  }

  return (
    <div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>DuckPass.</CardTitle>
            <CardDescription>
              One ID all across DuckLabs products.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form action={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500/70 text-xs" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={disabled || loading}
                  className={`duration-700 w-full ${
                    disabled
                      ? 'bg-green-500/30 focus:bg-green-500/30 hover:bg-green-500/30 text-green-500'
                      : ''
                  }`}
                >
                  {loading ? (
                    <Loader className="h-6 w-6 animate-spin" />
                  ) : disabled ? (
                    <CircleCheck className="h-6 w-6" />
                  ) : (
                    'Send My Magic Link'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p className="text-xs">
              By signing up, you agree to our Terms & Privacy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
