import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { clientPromise } from '@/lib/authDb';
import { CustomsendVerificationRequest } from '@/lib/authEmail';
import NextAuth from 'next-auth';
import Nodemailer from 'next-auth/providers/nodemailer';
import Resend from "next-auth/providers/resend"

const site = 'walad.link';
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: 'authData',
  }),
  providers: [
    Resend({
      from: process.env.EMAIL_FROM,
    }),
    Nodemailer({
      server: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      from: process.env.EMAIL_FROM,
      maxAge: 60 * 10,
      // sendVerificationRequest({ identifier, url, provider }) {
      //   CustomsendVerificationRequest({ identifier, url, provider, site });
      // },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!account.emailVerified) {
        user.isnew = true;
      }
      return { user, account };
    },
    async session({ session, user }) {
      session.user.role = user.role;
      session.user.isnew = user.isnew;
      return { session, user };
    },
    async jwt({ token, user, profile }) {
      return { token, user, profile };
    },
  },
  pages: {
    signUp: '/auth',
    signIn: '/auth',
    error: '/auth',
  },
  cookies: {
    sessionToken: {
      name: `_duckpass.session`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    callbackUrl: {
      name: `_duckpass.callback`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: `_duckpass.csrf`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
});

// const site = 'walad.link';
// export const authOptions = {
//   adapter: MongoDBAdapter(clientPromise, {
//     databaseName: 'authData',
//   }),
//   providers: [
//     EmailProvider({
//       server: {
//         host: process.env.SMTP_HOST,
//         port: process.env.SMTP_PORT,
//         auth: {
//           user: process.env.SMTP_USER,
//           pass: process.env.SMTP_PASS,
//         },
//       },
//       from: process.env.EMAIL_FROM,
//       maxAge: 60 * 10,
//       sendVerificationRequest({ identifier, url, provider }) {
//         CustomsendVerificationRequest({ identifier, url, provider, site });
//       }
//     }),
//   ],
//   // pages: {
//   //   signUp: '/auth',
//   //   signIn: '/auth',
//   //   error: '/auth',
//   // },
//   callbacks: {
//     async signIn({ user, account }) {
//       if(!account.emailVerified){
//         user.isnew = true
//       }
//       return { user, account };
//     },
//     async session({ session, user }) {
//       session.user.role = user.role
//       session.user.isnew = user.isnew
//       return { session, user };
//     },
//     async jwt({ token, user, profile, isNewUser }) {
//       return { token, user, profile, isNewUser };
//     },
//   },
// cookies: {
//   sessionToken: {
//     name: `_duckpass.session`,
//     options: {
//       httpOnly: true,
//       sameSite: 'lax',
//       path: '/',
//       secure: true,
//     },
//   },
//   callbackUrl: {
//     name: `_duckpass.callback`,
//     options: {
//       sameSite: 'lax',
//       path: '/',
//       secure: true,
//     },
//   },
//   csrfToken: {
//     name: `_duckpass.csrf`,
//     options: {
//       httpOnly: true,
//       sameSite: 'lax',
//       path: '/',
//       secure: true,
//     },
//   },
// },
// };
