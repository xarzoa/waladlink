'use client';
import { useState, useEffect } from 'react';
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
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader, CircleCheck, ArrowRight } from 'lucide-react';
import { useDebounce } from '@uidotdev/usehooks';
import { createUser } from '@/app/onboarding/actions';
import { useRouter } from 'next/navigation'

const usernameSearchSchema = z.object({
  username: z
    .string()
    .trim()
    .min(5, { message: 'Username must contain 4+ characters.' })
    .max(32, { message: 'Username cannot exceed 32 characters.' })
    .regex(/^[a-zA-Z0-9-]+$/, {
      message:
        'Username can only contain letters, numbers, underscores, and hyphens.',
    })
    .toLowerCase(),
});

function FormComp() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState('');
  const [success, setSuccess] = useState(false);
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const debouncedTerm = useDebounce(user, 1000);
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(usernameSearchSchema),
    defaultValues: { username: '' },
  });

  async function checkAvailability(data) {
    setUser(data.username);
  }

  useEffect(() => {
    const searchUsername = async () => {
      setDisabled(true);
      if (debouncedTerm) {
        setLoading(true);
        const toastId = toast.loading('Checking...');
        if (user) {
          const endpoint = `/onboarding/username?string=${user}`;
          const response = await fetch(endpoint);
          const data = await response.json();
          if (data.availability) {
            setAvailable(true);
            setDisabled(false);
            setLoading(false);
            toast.success(data.message, { id: toastId });
          } else {
            setDisabled(true);
            setLoading(false);
            setAvailable(false);
            toast.error(data.message, { id: toastId });
          }
        } else {
          setDisabled(true);
          setLoading(true);
          setAvailable(false);
          toast.error('Enter an username.', { id: toastId });
        }
      }
    };

    searchUsername();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTerm]);

  function inputChange(e) {
    const value = e.target.value;
    setUsername(value);
    if (5 >= value.length || value.length > 33) {
      setAvailable(false);
      setDisabled(true);
    }
  }

  async function handleSubmit(data) {
    setLoading(true)
    const toastId = toast.loading('Creating your account...')
    const res = await createUser(data)
    toast[res.type](res.message, { id: toastId })
    if(res.type === "success"){
      setSuccess(true)
      router.push('/dashboard')
    }
    setLoading(false)
    setDisabled(true)
  }

  return (
    <Form {...form}>
      <form
        onChange={form.handleSubmit(checkAvailability)}
        onSubmit={available ? form.handleSubmit(handleSubmit) : null}
        onKeyUp={inputChange}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div className="flex w-full">
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <SubmitButton
                  disabled={disabled}
                  loading={loading}
                  success={success}
                  type="submit"
                />
              </div>
              <div className="p-1 font-semibold font-lato text-sm text-transparent bg-clip-text bg-gradient-to-r from-neutral-700 to-white flex items-center">
                Walad.link/
                <pre
                  className={
                    available ? 'text-green-400/40' : 'text-red-500/60'
                  }
                >
                  {username}
                </pre>
              </div>
              <FormMessage className="text-red-500/70 text-xs" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function SubmitButton({ disabled, loading, success }) {
  return (
    <Button
      type="submit"
      size="icon"
      disabled={disabled || loading}
      className={`duration-700 h-10 w-14 ${
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
        <ArrowRight className="h-6 w-6"/>
      )}
    </Button>
  );
}

export default function Username() {
  return (
    <div>
      <div>
        <Card className="max-w-[100vw] w-[100vw] sm:w-[20rem] h-screen sm:h-[20rem] grid place-items-center">
          <div className="w-[20rem]">
            <CardHeader className="text-center">
              <CardTitle>Username.</CardTitle>
              <CardDescription>
                Choose an username to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormComp />
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
