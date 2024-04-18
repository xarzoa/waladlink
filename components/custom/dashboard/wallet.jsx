'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
import { useUser } from '@/lib/getUser';
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
import { addWallet, removeWallet } from '@/app/dashboard/wallets/action';
import { Loader, CircleCheck } from 'lucide-react';

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
    .regex(/^[^\s\W]+$/, 'Special characters not allowed.')
    .min(20, { message: 'Address must contain 20+ characters.' })
    .max(48, { message: 'Address cannot exceed 48 characters.' }),
});

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
        'Add'
      )}
    </Button>
  );
}

export default function WalletComp() {
  const [sucess, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { user, error, isLoading } = useUser(`/dashboard/get`);
  if (error) {
    toast.error(error);
  }
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
    const res = await addWallet(data);
    toast[res.type](res.message);
    if (res.type === 'success'){
      setSuccess(true)
      form.reset();
    }
    setLoading(false);
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
      setSuccess(false)
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
      {isLoading ? (
        <Skel />
      ) : user.data?.wallets[0] ? (
        <Wallets wallets={user.data.wallets} />
      ) : (
        <AddWallet />
      )}
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
  async function deleteAddress(name, address, id) {
    const res = await removeWallet({ name, address, id });
    toast[res.type](res.message);
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
            <Button
              size="icon"
              variant="ghost"
              className="text-red-500/70 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-500/70 hover:text-red-500/70"
            >
              <Trash2
                className="h-5 w-5"
                onClick={() => {
                  deleteAddress(wallet.name, wallet.address, wallet.id);
                }}
              />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Skel() {
  const wallets = [
    { address: '0x784B2faE5B399dB1343A98dBcA7827eff4B0b411', name: 'DogeBonk' },
    { address: '0x89765EEdD4D47b87aBCFcb9deFeC28D', name: 'PizzaCoin' },
    { address: '0xCA3C7c5A9E8cD4248Db64A2bF7Ff56c599E47aDf', name: 'MoonCat' },
    { address: '0x1D3B2c843aDf3A94c00cD2C5b3c7b7cAaE8D88bE', name: 'LazyCoin' },
    { address: '0xABc09876DEfGh1jKLmNopqR1234567890', name: 'SockPuppetCoin' },
    { address: '0xDef1234567890AbCdEfGhIjKlMnOpQrStUvWxYz', name: 'KarenCoin' },
    { address: '0xFfedcba0987654321AbCdEf0123456789', name: 'FOMOCoin' },
    { address: '0x1a2B3C4D5E6F7890AbCdEf1234567890', name: 'ScamCoin' },
    { address: '0x9876543210AbCdEfGhIjKlMnOpQrStUvWxYz', name: 'GlitchCoin' },
    { address: '0xBA9876543210Fedcba0987654321', name: 'CaffeineCoin' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 mb-12">
      {wallets.map((wallet, index) => (
        <Card key={index} className="p-2">
          <CardContent className="flex items-center justify-between p-2">
            <div>
              <Skeleton className="w-32 h-4 mb-2" />
              <Skeleton className="w-40 h-3" />
            </div>
            <Skeleton className="rounded-none h-9 w-9" />
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
