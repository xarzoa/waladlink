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
import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { addWallet, removeWallet } from './actions';
import { Loader } from 'lucide-react';
import SubmitButton from '@/components/custom/submit-button';
import { useFormState } from 'react-dom';

export default function WalletsComp({ user }) {
  const [open, setOpen] = useState(false);
  const [walletState, addWalletAction] = useFormState(addWallet, {});
  useEffect(
    (x) => {
      if (walletState.type) {
        toast[walletState.type](walletState.message);
      }
    },
    [walletState]
  );
  const doOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

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
            <form action={addWalletAction} className='space-y-3'>
              <div className='space-y-2'>
                <label htmlFor="name">Wallet name</label>
                <Input placeholder="Wallet name" name="name" id="name" />
              </div>
              <div className='space-y-2'>
                <label htmlFor="address">Wallet address</label>
                <Input
                  placeholder="Wallet address"
                  name="address"
                  id="address"
                />
              </div>
              <div className="flex justify-end">
                <SubmitButton
                  childern={'Add'}
                  type="submit"
                />
              </div>
            </form>
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
        <Card key={index} className="p-4">
          <CardContent className="flex items-center justify-between p-0">
            <div>
              <div className="font-bold">{wallet.name}</div>
              <div className="truncate max-w-[13rem] sm:max-w-[19rem] lg:max-w-md duration-700 text-sm font-jbmono text-neutral-400">
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
