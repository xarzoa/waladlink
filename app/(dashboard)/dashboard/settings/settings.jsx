'use client';
import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import SubmitButton from '@/components/custom/submit-button';
import { updateAvatar, updateInfo, deleteAccount } from './actions';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { useFormState } from 'react-dom';

export default function SettingsComp({ info }) {
  const [name, setName] = useState(info.name);
  const avatarInput = useRef(null);
  const [infoState, updateInfoAction] = useFormState(updateInfo, {});

  useEffect(() => {
    if (infoState.type) {
      toast[infoState.type](infoState.message);
    }
  }, [infoState]);

  async function handleAvatar(data) {
    const toastId = toast.loading('Uploading...');
    if (data.target.files.length === 1) {
      try {
        const file = new FormData();
        file.append('file', data.target.files[0]);
        let responce = await fetch(
          process.env.NEXT_PUBLIC_IMAGE_SERVER +
            '/upload?id=duckpass&path=avatars&bucket=ducklabs',
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>DuckPass Profile</CardTitle>
            <CardDescription>
              Edit your DuckPass profile. (Only visible to you.)
            </CardDescription>
          </CardHeader>
          <CardContent className="grid w-full lg:grid-cols-2 md:grid-cols-2 items-center gap-2">
            <div>
              <label>Avatar</label>
              <Avatar className="h-32 w-32 mt-3 relative grid place-items-center group duration-500">
                <AvatarImage
                  src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/optimize/duckpass/avatars/${info.image
                  }?bucket=ducklabs&width=128&height=128`}
                  alt={info.name}
                  className="group-hover:blur-lg duration-500"
                />
                <AvatarFallback className="group-hover:blur-lg duration-500">
                  {info.name
                    ? info.name.split('')[0].toUpperCase()
                    : info.email?.split('')[0].toUpperCase()}
                </AvatarFallback>
                <div className="absolute">
                  <input
                    onProgress={console.log}
                    placeholder="Change avatar"
                    type="file"
                    ref={avatarInput}
                    className="hidden"
                    onChange={handleAvatar}
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
              <div className="flex justify-end">
                <SubmitButton childern="Save" />
              </div>
            </form>
          </CardContent>
        </Card>
        <DeleteAccount />
      </div>
    </div>
  );
}

function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const [deleteState, deleteAction] = useFormState(deleteAccount, {});
  useEffect(() => {
    if (deleteState.type) {
      toast[deleteState.type](deleteState.message);
    }
  }, [deleteState]);
  const doOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Delete your Account</CardTitle>
          <CardDescription>
            Delete your DuckPass, WalAd account and all data.{' '}
            <b>This is not reversible</b>. <br />
            We <b>can not restore</b> your account once you deleted.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div></div>
            <SubmitButton childern={'Delete'} onClick={doOpen} />
            <Dialog onOpenChange={setOpen} open={open}>
              <DialogContent>
                <DialogHeader className="text-start">
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This will erase all your data from our servers. <br />
                    <b>This is not reversible</b>.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <div className="flex gap-3 justify-between md:justify-end">
                    <SubmitButton
                      childern={'Cancel'}
                      onClick={doOpen}
                      className="font-bold"
                    />
                    <form action={deleteAction}>
                      <SubmitButton childern={'Continue'} />
                    </form>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
