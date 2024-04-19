// import NextAuth from 'next-auth';
// import { authOptions } from '@/lib/auth';
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import { handlers } from "@/lib/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers