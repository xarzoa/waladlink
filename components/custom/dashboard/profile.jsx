'use client';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/lib/getUser';
import { Skeleton } from '@/components/ui/skeleton';
import {
  updateInfo,
  updateTheme,
  updateAvatar,
  updateUsername,
} from '@/app/(dashboard)/dashboard/profile/action';
import { useDebounce } from '@uidotdev/usehooks';
import SubmitButton from '../submit-button';

const infoSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must contain 3+ characters.' })
    .max(16, { message: 'Name cannot exceed 16 characters.' }),
  location: z
    .string()
    .max(16, { message: 'Location cannot exceed 16 characters.' })
    .optional(),
  bio: z
    .string()
    .max(200, { message: 'Bio cannot exceed 200 characters.' })
    .optional(),
});

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

const themeSchema = z.object({
  theme: z.enum(['candy', 'glass', 'graphite', 'clouds'], {
    required_error: 'You need to select a theme.',
  }),
});

function BasicInfo({ info }) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const form = useForm({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      name: info.name,
      location: info.location,
      bio: info.bio,
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

  async function handleAvater(data) {
    const toastId = toast.loading('Uploading...');
    if (data.target.files.length === 1) {
      try {
        const file = new FormData();
        file.append('file', data.target.files[0]);
        let responce = await fetch(
          'https://images.ducklabs.xyz/upload?id=waladlinkweb&path=avatars&bucket=ducklabs',
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
    <div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your name and info.</CardDescription>
          </CardHeader>
          <CardContent className="grid w-full lg:grid-cols-2 md:grid-cols-2 items-center gap-2">
            <div>
              <Label>Picture</Label>
              <Avatar className="h-32 w-32 mt-3">
                <AvatarImage
                  src={`${info.avatar}&width=128&height=128`}
                  alt={info.username}
                />
                <AvatarFallback>
                  {info.name
                    ? info.name.split('')[0].toUpperCase()
                    : info.username?.split('')[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <Input
              placeholder="Avatar"
              type="file"
              accept="image/png, image/webp, image/jpeg"
              onChange={handleAvater}
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
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-neutral-300">
                        Location
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Location" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500/70 text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-neutral-300">
                        Bio
                      </FormLabel>
                      <FormControl>
                        <Textarea placeholder="Add your bio" {...field} />
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

function BasicInfoSkeleton() {
  return (
    <div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your name and info.</CardDescription>
          </CardHeader>
          <CardContent className="grid w-full lg:grid-cols-2 md:grid-cols-2 items-center gap-2">
            <div>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-32 w-32 mt-3" />
            </div>
            <Skeleton className="h-8 w-40" />
          </CardContent>
          <CardContent>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-28 mt-3" />
            <div className="m-4"></div>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-28 mt-3" />
            <Skeleton className="h-8 w-16 my-3" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ThemeBuilder({ theme }) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const form = useForm({
    resolver: zodResolver(themeSchema),
    defaultValue: theme,
  });
  form.setValue(theme);
  async function handleChange(data) {
    setLoading(true);
    const toastId = toast.loading('Changing your theme...');
    const res = await updateTheme(data);
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
    }, 10000);
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your theme.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleChange)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={theme}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="candy" />
                          </FormControl>
                          <FormLabel className="font-normal">Candy</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="clouds" />
                          </FormControl>
                          <FormLabel className="font-normal">Clouds</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="glass" />
                          </FormControl>
                          <FormLabel className="font-normal">Glass</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="graphite" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Graphite
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <div></div>
                <SubmitButton
                  disabled={disabled}
                  success={success}
                  loading={loading}
                  childern={'Choose'}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

function ThemeBuilderSkeleton() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your theme.</CardDescription>
        </CardHeader>
        <CardContent className="grid w-full lg:grid-cols-2 md:grid-cols-2 items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-28 mt-3" />
          <Skeleton className="h-4 w-20 mt-3" />
          <Skeleton className="h-4 w-28 mt-3" />
        </CardContent>
      </Card>
    </div>
  );
}

function ChangeUsername({ username }) {
  const [user, setUser] = useState('');
  const [success, setSuccess] = useState(false);
  const [available, setAvailable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const debouncedTerm = useDebounce(user, 1000);
  const form = useForm({
    resolver: zodResolver(usernameSearchSchema),
    defaultValues: { username },
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
    if (5 >= value.length || value.length > 33) {
      setAvailable(false);
      setDisabled(true);
    }
  }

  async function handleSubmit(data) {
    const toastId = toast.loading('Updating...');
    setLoading(true);
    const res = await updateUsername(data);
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
      setAvailable(null);
    }, 10000);
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Username</CardTitle>
          <CardDescription>Change your username.</CardDescription>
        </CardHeader>
        <CardContent>
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
                        <Input
                          placeholder="Username"
                          className={
                            available === null
                              ? ''
                              : available === false
                              ? 'border-2 border-red-500/60'
                              : 'border-2 border-green-400/40'
                          }
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-red-500/70 text-xs" />
                    <div className="flex justify-between">
                      <div></div>
                      <SubmitButton
                        disabled={disabled}
                        success={success}
                        loading={loading}
                        childern={'Change'}
                      />
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

function ChangeUsernameSkeleton() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Username</CardTitle>
          <CardDescription>Change your username.</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-28 mt-3" />
          <Skeleton className="h-8 w-16 my-3" />
        </CardContent>
      </Card>
    </div>
  );
}

export function ProfileComp() {
  const { user, error, isLoading } = useUser(`/dashboard/get`);
  if (error) {
    toast.error(error);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
      {isLoading ? (
        <>
          <BasicInfoSkeleton />
          <ThemeBuilderSkeleton />
          <ChangeUsernameSkeleton />
        </>
      ) : (
        <>
          <BasicInfo info={user.data} />
          <ThemeBuilder theme={user.data.theme} />
          <ChangeUsername username={user.data.username} />
        </>
      )}
    </div>
  );
}
