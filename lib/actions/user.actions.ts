'use server';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { signIn, signOut } from '@/auth';
import { signInFormSchema } from '../validator';

// Sign in the user with credentials
export async function signInWithCredentials(_: unknown, formDate: FormData) {
  try {
    const user = await signInFormSchema.parse({
      email: formDate.get('email'),
      password: formDate.get('password'),
    });
    await signIn('credentials', user);
    return { success: true, message: 'Signed in successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: 'Invalid email or password' };
  }
}

// Sign the user out
export async function signOutUser() {
  await signOut();
}
