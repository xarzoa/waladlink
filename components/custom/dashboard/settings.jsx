'use client';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SubmitButton from '../submit-button';
import { updateAvatar, updateInfo } from '@/app/(dashboard)/dashboard/settings/action';

const FormSchema = z.object({
  name: z.string(),
});

export default function SettingsComp({ data }) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data.name || '',
    },
  });
  async function onSubmit(data) {
    setLoading(true);
    const toastId = toast.loading('Updating your info...');
    const res = await updateInfo(data);
    toast[res.type](res.message, { id: toastId });
    if (res.type === 'success') {
      setSuccess(true);
      form.reset();
    }
    setLoading(false);
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
      setSuccess(false);
    }, 2000);
  }
  async function handleAvatar(data) {
    const toastId = toast.loading('Uploading...');
    if (data.target.files.length === 1) {
      try {
        const file = new FormData();
        file.append('file', data.target.files[0]);
        let responce = await fetch(
          'https://images.ducklabs.xyz/upload?id=duckpass&path=avatars&bucket=ducklabs',
          {
            method: 'POST',
            body: file,
          }
        );
        responce = await responce.json();
        const res = await updateAvatar(responce);
        toast[res.type](res.message, { id: toastId });
      } catch (e) {
        console.log(e);
        toast.error(e.message, { id: toastId });
      }
    } else {
      toast.error('Select 1 file.', { id: toastId });
    }
  }

  return (
    <div className="mt-3">
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
              <Label>Picture</Label>
              <Avatar className="h-32 w-32 mt-[8px]">
                <AvatarImage
                  src={`${data.image}&width=128&height=128`}
                  alt={data.name || 'Profile picture'}
                />
                <AvatarFallback>
                  {data.name
                    ? data.name.split('')[0].toUpperCase()
                    : data.email.split('')[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <Input
              placeholder="Avatar"
              type="file"
              accept="image/png, image/webp, image/jpeg"
              onChange={handleAvatar}
            />
          </CardContent>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-neutral-300">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500/70 text-xs" />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <div></div>
                  <SubmitButton
                    disabled={disabled}
                    success={success}
                    loading={loading}
                    childern={'Save'}
                  />
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
