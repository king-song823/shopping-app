'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { signInDefaultValues } from '@/lib/constants';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signInWithCredentials } from '@/lib/actions/user.actions';
import { useSearchParams } from 'next/navigation';

const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    message: '',
    success: false,
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? 'Signing In...' : 'Sign In with credentials'}
      </Button>
    );
  };
  return (
    <div>
      <form action={action}>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              required
              type="email"
              defaultValue={signInDefaultValues.email}
              autoComplete="email"
            ></Input>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              required
              type="password"
              defaultValue={signInDefaultValues.password}
              autoComplete="current-password"
            ></Input>
          </div>
          <div>
            <SignInButton />
            {data && !data.success && (
              <div className="text-center text-destructive">{data.message}</div>
            )}
          </div>
          <div className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link target="_self" className="link" href="/sign-up">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CredentialsSignInForm;
