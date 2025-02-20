import { compareSync } from 'bcrypt-ts-edge';
import NextAuth, { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db/prisma';

interface CustomSessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface CustomToken {
  id?: string;
  name?: string;
  role?: string;
  email?: string;
}

async function handleDefaultName(user: CustomSessionUser) {
  if (user.name === 'NO_NAME') {
    const defaultName = user.email!.split('@')[0];
    await prisma.user.update({
      where: { id: user.id },
      data: { name: defaultName },
    });
    return defaultName;
  }
  return user.name;
}
const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: parseInt(process.env.SESSION_MAX_AGE || '2592000'), // 30 days in seconds
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user || !user.password) return null;

          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );
          if (!isMatch) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session({
      session,
      token,
    }: {
      session: { user: CustomSessionUser };
      token: CustomToken;
    }) {
      session.user.id = token.id!;
      session.user.name = token.name!;
      session.user.role = token.role!;
      return session;
    },
    async jwt({
      token,
      user,
    }: {
      token: CustomToken;
      user?: CustomSessionUser;
    }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.name = await handleDefaultName(user);
      }
      return token;
    },
    authorized({ request }: { request: NextRequest }) {
      const sessionCartId =
        request.cookies.get('sessionCartId')?.value || crypto.randomUUID();
      const response = NextResponse.next();

      if (!request.cookies.get('sessionCartId')) {
        response.cookies.set('sessionCartId', sessionCartId);
      }

      return response;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
