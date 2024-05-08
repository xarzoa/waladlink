'use client';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { signInAction } from './action';
import Link from 'next/link';
import SubmitButton from '@/components/custom/submit-button';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';

export default function Authentication() {
  const [state, signIn] = useFormState(signInAction, {});
  const [error, setError] = useState(null)
  useEffect(() => {
    if(state.type === 'error') {
      setError(state.message)
      setTimeout(x => {
        setError(null)
      }, 3000)
    }
    if(state.type === 'success'){
      toast.success(state.message)
    }
  }, [setError, state])

  return (
    <div>
      <div className="relative font-jbmono">
        <div className="absolute left-5 h-14 w-14 bg-white blur-3xl -z-20 animate-preview delay-700"></div>
        <Card>
          <CardHeader>
            <CardTitle>DuckPass.</CardTitle>
            <CardDescription>
              One ID all across DuckLabs products.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={signIn} className="space-y-2">
              <label htmlFor="email" className='text-sm font-bold'>Email</label>
              <Input placeholder="Email" name="email" id="email"/>
              <div className="text-xs text-red-500">
                {error}
              </div>
              <SubmitButton childern="Send My Magic-Link" className="w-full font-bold" />
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-xs">
              By signing up, you agree to our{' '}
              <Link
                className="underline"
                href="/legal/terms"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms
              </Link>{' '}
              &{' '}
              <Link
                className="underline"
                href="/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
        <div className="absolute h-20 w-14 bg-white blur-3xl -z-20 right-0 bottom-20 animate-preview"></div>
      </div>
    </div>
  );
}
