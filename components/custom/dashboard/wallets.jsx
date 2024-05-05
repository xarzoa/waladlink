'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';
import {
  addWallet,
  removeWallet,
} from '@/app/(dashboard)/dashboard/wallets/action';
import { Loader } from 'lucide-react';
import SubmitButton from '../submit-button';

const FormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Name must contain 3+ characters.' })
    .max(16, { message: 'Name cannot exceed 16 characters.' })
    .regex(/^[a-zA-Z0-9\$]+$/, 'Special characters not allowed.'),
  address: z
    .string()
    .trim()
    .min(20, { message: 'Address must contain 20+ characters.' })
    .max(48, { message: 'Address cannot exceed 48 characters.' }),
});

export default function WalletsComp({ user }) {
  const [sucess, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const doOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      address: '',
    },
  });
  async function onSubmit(data) {
    setLoading(true);
    const toastId = toast.loading('Adding your wallet...');
    const res = await addWallet(data);
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

  return (
    <div>
      <Card className="lg:block hidden duration-500">
        <CardContent className="flex items-center p-2 relative justify-between">
          <div>
            <div className="font-bold text-lg">Add a wallet address.</div>
          </div>
          <Button onClick={doOpen} size="icon">
            <Plus className="h-5 w-5" strokeWidth={3} />
          </Button>
        </CardContent>
      </Card>
      {user.wallets[0] ? <Wallets wallets={user.wallets} /> : <AddWallet />}
      <div className="fixed bottom-3 right-3 lg:hidden block duration-500">
        <Button onClick={doOpen} size="icon">
          <Plus className="h-5 w-5" strokeWidth={3} />
        </Button>
      </div>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a wallet.</DialogTitle>
            <DialogDescription>
              Add your wallet name and address.
            </DialogDescription>
          </DialogHeader>
          <div>
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
                        Wallet name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Wallet name" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500/70 text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-neutral-300">
                        Wallet Address
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Wallet address" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500/70 text-xs" />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <div></div>
                  <SubmitButton
                    disabled={disabled}
                    success={sucess}
                    loading={loading}
                    childern={'Add'}
                    type="submit"
                  />
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Wallets({ wallets }) {
  const [loading, setLoading] = useState(false);
  const [walletId, setWalletId] = useState(null);
  async function deleteAddress(name, address, id) {
    setWalletId(id);
    setLoading(true);
    const toastId = toast.loading('Deleting your wallet...');
    const res = await removeWallet({ name, address, id });
    toast[res.type](res.message, { id: toastId });
    setWalletId(null);
    setLoading(false);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 mb-12">
      {wallets.map((wallet, index) => (
        <Card key={index} className="p-2">
          <CardContent className="flex items-center justify-between p-0">
            <div>
              <div className="font-bold">{wallet.name}</div>
              <div className="truncate max-w-[13rem] sm:max-w-[20rem] lg:max-w-md duration-700">
                {wallet.address}
              </div>
            </div>
            <Button size="icon" variant="ghost">
              {loading && wallet.id === walletId ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <Trash2
                  className="h-5 w-5"
                  onClick={() => {
                    deleteAddress(wallet.name, wallet.address, wallet.id);
                  }}
                />
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AddWallet() {
  return (
    <div className="w-full mt-2">
      <Card className="p-2 w-full">
        <CardContent className="mt-4">
          <div className="font-bold text-center">
            Seems like you have no wallets yet. Add one by clicking plus Icon.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
