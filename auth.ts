import { compareSync } from 'bcrypt-ts-edge';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '@/db/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
// import { NextResponse } from 'next/server';

export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email',
        },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  // callbacks: {
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   async session({ session, token, trigger }: any) {
  //     session.user.id = token.id;
  //     session.user.name = token.name;
  //     session.user.role = token.role;

  //     if (trigger === 'update' && token.name) {
  //       session.user.name = token.name;
  //     }

  //     return session;
  //   },
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   async jwt({ token, user, trigger, session }: any) {
  //     if (user) {
  //       token.role = user.role;
  //       token.id = user.id;
  //       if (user.name === 'NO_NAME') {
  //         token.name = user.email!.split('@')[0];

  //         await prisma.user.update({
  //           where: { id: user.id },
  //           data: { name: token.name },
  //         });
  //       }
  //     }

  //     if (session?.user.name && trigger === 'update') {
  //       token.name = session.user.name;
  //     }

  //     return token;
  //   },
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   authorized({ request }: any) {
  //     if (!request.cookies.get('sessionCartId')) {
  //       const sessionCartId = crypto.randomUUID();
  //       const newRequestHeaders = new Headers(request.headers);
  //       const response = NextResponse.next({
  //         request: {
  //           headers: newRequestHeaders,
  //         },
  //       });

  //       response.cookies.set('sessionCartId', sessionCartId);
  //       return response;
  //     }
  //     return true;
  //   },
  // },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
