'use client';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader } from 'lucide-react';

const FormSchema = z.object({
  name: z.string(),
  image: z.string(),
});

export default function SettingsComp({ name }) {
  const [error, setError] = useState(null);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: name,
    },
  });
  async function onSubmit(data) {
    setLoading(true);
    try {
      setError(null);
      toast.success("Name updated.",{
        description: `You updated your name to ${data.name} successfully.`,
      });
      setLoading(false);
      setDisable(true);
      form.reset();
    } catch (e) {
      setError(e.message);
      toast.error("Dang",{
        description: error,
      });
    }

    setTimeout(() => {
      setError(null);
    }, 3000);

    setTimeout(() => {
      setDisable(false);
    }, 30000);
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Name</CardTitle>
            <CardDescription>
              Edit your name. (Only visible to you.)
            </CardDescription>
          </CardHeader>
          <CardContent className="grid w-full lg:grid-cols-2 md:grid-cols-2 items-center gap-2">
            <div>
              <Label htmlFor="picture">Picture</Label>
              <Avatar id="picture" className="h-32 w-32 mt-[8px]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <Input type="file" className="mt-[8px]" />
          </CardContent>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="name">Name</Label>
                      <FormControl>
                        <Input placeholder="Name" id="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={disable || loading}
                  className="duration-700 w-full"
                >
                  {loading ? (
                    <Loader className="h-6 w-6 animate-spin" />
                  ) : (
                    'Update'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
