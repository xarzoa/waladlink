'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
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
import axios from 'axios';

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

function FormComp({ id }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const form = useForm({
    resolver: zodResolver(usernameSearchSchema),
    defaultValues: { username: '' },
  });

  const checkAvailability = async (data) => {
    setLoading(true);
    setDisabled(true);
    setAvailable(false);
    const value = data.username;
    try {
      const response = await axios.get(
        `/onboarding/username?string=${value}`
      );
      const isAvailable = response.data.availability;
      if (isAvailable) {
        setDisabled(false);
        setLoading(false);
        setAvailable(true);
      } else {
        setAvailable(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  function inputChange(e) {
    const value = e.target.value;
    setUsername(value);
    if (5 >= value.length || value.length > 33) {
      setAvailable(false);
      setDisabled(true);
    }
  }

  async function createUser(data){
    setLoading(true)
    setDisabled(true)
    if(username === data.username){
      try{
        await axios.post(`/onboarding/create`, { username: data.username })
      }catch(e){
        console.log(e)
      }
    }
    setLoading(false)
    setDisabled(false)
  }

  return (
    <Form {...form}>
      <form
        onChange={form.handleSubmit(checkAvailability)}
        onSubmit={form.handleSubmit(createUser)}
        onKeyUp={inputChange}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
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
              <FormMessage className="text-red-500/60 text-xs" />
            </FormItem>
          )}
        />
        <SubmitButton disabled={disabled} loading={loading} type="submit"/>
      </form>
    </Form>
  );
}

function SubmitButton({ disabled, loading, success }) {
  return (
    <Button
      type="submit"
      disabled={disabled || loading}
      className={`duration-700 w-full ${
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
        'Choose'
      )}
    </Button>
  );
}

export default function Username({ id }) {
  return (
    <div>
      <div>
        <Card className="max-w-[100vw] w-[100vw] sm:w-[20rem] h-screen sm:h-[20rem] grid place-items-center">
          <div className='w-[20rem]'>
            <CardHeader className="text-center">
              <CardTitle>Username.</CardTitle>
              <CardDescription>
                Choose a username to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormComp id={id} />
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
