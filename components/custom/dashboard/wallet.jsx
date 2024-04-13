'use client';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

export default function WalletComp() {
  const [open, setOpen] = useState(false);
  const doOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  return (
    <div>
      <Card className="lg:block hidden">
        <CardContent className="flex items-center p-2 relative justify-between">
          <div>
            <div className='font-bold text-lg'>Add a wallet address.</div>
          </div>
          <Button onClick={doOpen} size="icon">
            <Plus className="h-5 w-5" strokeWidth={3} />
          </Button>
        </CardContent>
      </Card>
      <div className="fixed bottom-3 right-3 lg:hidden block">
        <Button onClick={doOpen} size="icon">
          <Plus className="h-5 w-5" strokeWidth={3} />
        </Button>
      </div>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
