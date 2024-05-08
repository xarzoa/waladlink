'use client';
import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

  if (infoState.type) {
    toast[infoState.type](infoState.message);
  }

  async function handleAvater(data) {
    const toastId = toast.loading('Uploading...');
    if (data.target.files.length === 1) {
      try {
        const file = new FormData();
        file.append('file', data.target.files[0]);
        let response = await fetch(
          'https://images.ducklabs.xyz/upload?id=waladlinkweb&path=avatars&bucket=ducklabs',
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
              <Label>Avatar</Label>
              <Avatar className="h-32 w-32 mt-3 relative grid place-items-center group duration-500">
                <AvatarImage
                  src={`${info.avatar}&width=128&height=128`}
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
                    accept="image/png, image/webp, image/jpeg"
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
              <SubmitButton childern="Save" />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ThemeBuilder({ theme }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your theme.</CardDescription>
        </CardHeader>
        <CardContent>
          <Select defaultValue='light' onValueChange={value => console.log(value)}>
            <SelectTrigger>
              <SelectValue defaultValue="light"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
}

// function ChangeUsername({ username }) {
//   const [user, setUser] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [available, setAvailable] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [disabled, setDisabled] = useState(true);
//   const debouncedTerm = useDebounce(user, 1000);
//   const form = useForm({
//     resolver: zodResolver(usernameSearchSchema),
//     defaultValues: { username },
//   });
//   async function checkAvailability(data) {
//     setUser(data.username);
//   }
//   useEffect(() => {
//     const searchUsername = async () => {
//       setDisabled(true);
//       if (debouncedTerm) {
//         setLoading(true);
//         const toastId = toast.loading('Checking...');
//         if (user) {
//           const endpoint = `/onboarding/username?string=${user}`;
//           const response = await fetch(endpoint);
//           const data = await response.json();
//           if (data.availability) {
//             setAvailable(true);
//             setDisabled(false);
//             setLoading(false);
//             toast.success(data.message, { id: toastId });
//           } else {
//             setDisabled(true);
//             setLoading(false);
//             setAvailable(false);
//             toast.error(data.message, { id: toastId });
//           }
//         } else {
//           setDisabled(true);
//           setLoading(true);
//           setAvailable(false);
//           toast.error('Enter an username.', { id: toastId });
//         }
//       }
//     };
//     searchUsername();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [debouncedTerm]);
//   function inputChange(e) {
//     const value = e.target.value;
//     if (5 >= value.length || value.length > 33) {
//       setAvailable(false);
//       setDisabled(true);
//     }
//   }

//   async function handleSubmit(data) {
//     const toastId = toast.loading('Updating...');
//     setLoading(true);
//     const res = await updateUsername(data);
//     toast[res.type](res.message, { id: toastId });
//     if (res.type === 'success') {
//       setSuccess(true);
//       form.reset();
//     }
//     setLoading(false);
//     setDisabled(true);
//     setTimeout(() => {
//       setDisabled(false);
//       setSuccess(false);
//       setAvailable(null);
//     }, 10000);
//   }
//   return (
//     <div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Username</CardTitle>
//           <CardDescription>Change your username.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form
//               onChange={form.handleSubmit(checkAvailability)}
//               onSubmit={available ? form.handleSubmit(handleSubmit) : null}
//               onKeyUp={inputChange}
//               className="space-y-4"
//             >
//               <FormField
//                 control={form.control}
//                 name="username"
//                 render={({ field }) => (
//                   <FormItem>
//                     <div className="flex w-full">
//                       <FormControl>
//                         <Input
//                           placeholder="Username"
//                           className={
//                             available === null
//                               ? ''
//                               : available === false
//                               ? 'border-2 border-red-500/60'
//                               : 'border-2 border-green-400/40'
//                           }
//                           {...field}
//                         />
//                       </FormControl>
//                     </div>
//                     <FormMessage className="text-red-500/70 text-xs" />
//                     <div className="flex justify-between">
//                       <div></div>
//                       <SubmitButton
//                         disabled={disabled}
//                         success={success}
//                         loading={loading}
//                         childern={'Change'}
//                         type="submit"
//                       />
//                     </div>
//                   </FormItem>
//                 )}
//               />
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

export default function ProfileComp({ user }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
      <BasicInfo info={user} />
      <ThemeBuilder theme={user.theme} />
      {/* <ChangeUsername username={user.username} /> */}
    </div>
  );
}
