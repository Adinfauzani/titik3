import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials.email as string
        const password = credentials.password as string

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user?.password) return null

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) return null

        return { id: user.id, name: user.name, email: user.email, role: user.role }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) session.user.id = token.sub
      if (token.role) session.user.role = token.role as string
      return session
    },
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role
      return token
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: { strategy: "jwt" },
})
