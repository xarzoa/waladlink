'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import {
  updateInfo,
  updateTheme,
  updateAvatar,
  updateUsername,
} from './actions';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@uidotdev/usehooks';
import SubmitButton from '@/components/custom/submit-button';
import { useFormState } from 'react-dom';
import { Camera } from 'lucide-react';

function BasicInfo({ info }) {
  const [name, setName] = useState(info.name);
  const [location, setLocation] = useState(info.location);
  const [bio, setBio] = useState(info.bio);
  const avatarInput = useRef(null);
  const [infoState, updateInfoAction] = useFormState(updateInfo, {});

  useEffect(
    (x) => {
      if (infoState.type) {
        toast[infoState.type](infoState.message);
      }
    },
    [infoState]
  );

  async function handleAvater(data) {
    const toastId = toast.loading('Uploading...');
    if (data.target.files.length === 1) {
      try {
        const file = new FormData();
        file.append('file', data.target.files[0]);
        let response = await fetch(
          process.env.NEXT_PUBLIC_IMAGE_SERVER +
            '/upload?id=web&path=avatars&bucket=walad',
          {
            method: 'POST',
            body: file,
          }
        );
        response = await response.json();
        const res = await updateAvatar(response);
        toast[res.type](res.message, { id: toastId });
      } catch (e) {
        console.log(e);
        toast.error(e.message, { id: toastId });
      }
    } else {
      toast.error('Select a file.', { id: toastId });
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
              <label>Avatar</label>
              <Avatar className="h-32 w-32 mt-3 relative grid place-items-center group duration-500">
                <AvatarImage
                  src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/optimize/web/avatars/${info.avatar
                  }?bucket=walad&width=128&height=128`}
                  alt={info.username}
                  className="group-hover:blur-lg duration-500"
                />
                <AvatarFallback className="group-hover:blur-lg duration-500">
                  {info.name
                    ? info.name.split('')[0].toUpperCase()
                    : info.username?.split('')[0].toUpperCase()}
                </AvatarFallback>
                <div className="absolute">
                  <input
                    onProgress={console.log}
                    placeholder="Change avatar"
                    type="file"
                    ref={avatarInput}
                    className="hidden"
                    onChange={handleAvater}
                    accept="image/png, image/webp, image/jpeg, image/gif"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-32 w-32 group bg-transparent focus:bg-transparent hover:bg-transparent"
                    onClick={() => avatarInput.current.click()}
                  >
                    <Camera className="size-10 invisible group-hover:visible duration-200" />
                  </Button>
                </div>
              </Avatar>
            </div>
          </CardContent>
          <CardContent>
            <form action={updateInfoAction} className="space-y-3">
              <div className="space-y-2">
                <label htmlFor="name" className="font-bold text-sm font-jbmono">
                  Name
                </label>
                <Input
                  placeholder="Name"
                  name="name"
                  id="name"
                  defaultValue={name}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="font-bold text-sm font-jbmono"
                >
                  Location
                </label>
                <Input
                  placeholder="Location"
                  name="location"
                  id="location"
                  defaultValue={location}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="name" className="font-bold text-sm font-jbmono">
                  Bio
                </label>
                <Textarea
                  placeholder="Add your bio"
                  name="bio"
                  defaultValue={bio}
                />
              </div>
              <div className="flex justify-end">
                <SubmitButton childern="Save" />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ThemeBuilder({ oldTheme }) {
  const [theme, setTheme] = useState(oldTheme);
  const [themeState, updateThemeAction] = useFormState(updateTheme, {});

  useEffect(
    (x) => {
      if (themeState.type) {
        toast[themeState.type](themeState.message);
      }
    },
    [themeState]
  );

  const handleChange = async (e) => {
    setTheme(e.target.value);
    await updateThemeAction(e.target.value);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your theme.</CardDescription>
        </CardHeader>
        <CardContent className="font-jbmono">
          <form onChange={handleChange}>
            <Select defaultValue={theme}>
              <SelectTrigger>
                <SelectValue defaultValue={theme} />
              </SelectTrigger>
              <SelectContent className="font-jbmono">
                <SelectItem value="candy">Candy</SelectItem>
                <SelectItem value="clouds">Clouds</SelectItem>
                <SelectItem value="glass">Glass</SelectItem>
                <SelectItem value="graphite">Graphite</SelectItem>
              </SelectContent>
            </Select>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function ChangeUsername({ username }) {
  const [user, setUser] = useState(username);
  const [available, setAvailable] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [changed, setChanged] = useState(false);
  const debouncedTerm = useDebounce(user, 1000);
  const [usernameState, updateUsernameAction] = useFormState(
    updateUsername,
    {}
  );

  const searchUsername = async (user) => {
    setDisabled(true);
    if (debouncedTerm) {
      const toastId = toast.loading('Checking...');
      if (user) {
        const endpoint = `/onboarding/username?string=${user}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        if (data.availability) {
          setAvailable(true);
          setDisabled(false);
          toast.success(data.message, { id: toastId });
        } else {
          setDisabled(true);
          setAvailable(false);
          toast.error(data.message, { id: toastId });
        }
      } else {
        setDisabled(true);
        setAvailable(false);
        toast.error('Enter an username.', { id: toastId });
      }
    }
  };
  useEffect(() => {
    if (usernameState.type) {
      toast[usernameState.type](usernameState.message);
    }
  }, [usernameState]);
  useEffect(() => {
    if (changed && debouncedTerm) {
      searchUsername(user);
    }
    setTimeout(() => {
      setChanged(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTerm]);
  function inputChange(e) {
    const value = e.target.value;
    setUser(value);
    setChanged(true);
    console.log(value);
    if (5 >= value.length || value.length > 33) {
      setAvailable(false);
      setDisabled(true);
    }
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Username</CardTitle>
          <CardDescription>Change your username.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onChange={inputChange}
            action={available ? updateUsernameAction : null}
            className="space-y-4"
          >
            <Input
              placeholder="Username"
              defaultValue={user}
              name="username"
              className="font-jbmono"
            />
            <div className='flex w-full justify-end'>
              <SubmitButton
                disabled={disabled && !available}
                childern={'Change'}
                type="submit"
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProfileComp({ user }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
      <BasicInfo info={user} />
      <ThemeBuilder oldTheme={user.theme} />
      <ChangeUsername username={user.username} />
    </div>
  );
}
