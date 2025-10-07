// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { postData } from "@/lib/services/api";
// import { jwtDecode } from "jwt-decode";

// // async function refreshAccessToken() {
// //   console.log("refresh token called")
// //   try {
// //     const res = await getData<{ access_token: string }>("refresh");

// //     if (!res.success || !res.data) {
// //       throw new Error("Failed to refresh token");
// //     }

// //     const decodedToken = jwtDecode<{ exp: number }>(res.data.access_token);
// //     return {
// //       token: res.data.access_token,
// //       accessTokenExpires: decodedToken.exp * 1000,
// //     };
// //   } catch {
// //     return null;
// //   }
// // }

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     CredentialsProvider({
//       credentials: {},
//       async authorize(credentials) {
//         if (!credentials) {
//           throw new Error(
//             JSON.stringify({ error: "Credentials are required" })
//           );
//         }
//         const res = await postData<
//           typeof credentials,
//           { access_token: string }
//         >("login", credentials);

//         if (!res.success || !res.data) {
//           throw new Error(JSON.stringify({ error: res.message }));
//         }
//         const decodedToken = jwtDecode<{ exp: number }>(res.data.access_token);
//         return {
//          ...res.data,
//           token: res.data.access_token,
//           accessTokenExpires: decodedToken.exp * 1000,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     jwt: async ({ token, user }) => (user ? { ...token, ...user } : token),
//     session: ({ session, token }) => {
//       if (Date.now() > (token.accessTokenExpires as number)) {
//         return { ...session, user: undefined };
//       }
//       return {
//         ...session,
//         user: {
//           id: token.id as string,
//           name: token.name,
//           email: token.email,
//           token: token.token,
//         },
//       };
//     },
//   },
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
//   trustHost: true,
// });

import NextAuth, { type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { postData } from "@/lib/services/api";
import { jwtDecode } from "jwt-decode";

// Response structure from your backend login endpoint
type LoginResponse = {
  access_token: string;
  id: string;
  name?: string;
  email?: string;
};

// Extend the User object to include token and expiry
type CustomUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  token: string;
  accessTokenExpires: number;
};

// Extend JWT token type to persist in callbacks
type CustomJWT = {
  id?: string;
  name?: string | null;
  email?: string | null;
  token?: string;
  accessTokenExpires?: number;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials): Promise<CustomUser | null> {
        if (!credentials) {
          throw new Error(JSON.stringify({ error: "Credentials are required" }));
        }

        const res = await postData<typeof credentials, LoginResponse>("login", credentials);
        if (!res.success || !res.data) {
          throw new Error(JSON.stringify({ error: res.message }));
        }

        const decodedToken = jwtDecode<{ exp: number }>(res.data.access_token);

        return {
          id: res.data.id,
          name: res.data.name ?? null,
          email: res.data.email ?? null,
          token: res.data.access_token,
          accessTokenExpires: decodedToken.exp * 1000,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const customToken = token as CustomJWT;
      if (user) {
        const customUser = user as CustomUser;
        customToken.id = customUser.id;
        customToken.name = customUser.name ?? null;
        customToken.email = customUser.email ?? null;
        customToken.token = customUser.token;
        customToken.accessTokenExpires = customUser.accessTokenExpires;
      }
      return customToken;
    },
    session({ session, token }) {
      const customToken = token as CustomJWT;

      if (Date.now() > (customToken.accessTokenExpires ?? 0)) {
        return { ...session, user: undefined };
      }

      return {
        ...session,
        user: {
          id: customToken.id!,
          name: customToken.name,
          email: customToken.email,
          token: customToken.token!,
        },
      };
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
} satisfies NextAuthConfig);
