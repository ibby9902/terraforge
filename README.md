# Terraforge

Terraforge is a platform to discover & publish Terraria mods.

## Built with:
- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)

## Getting started

Setting up a local environment is very easy:

1. Clone the `dev` branch
2. Run `npm install`
3. Create a `.env` file in the root folder. (Populate it by following `.env.example`)
4. Run `npm run db:push` or `npx prisma db push`

If you need quick access to your database, use `npm run db:studio` or `npx prisma studio`. This will start a secondary application where you can modify the database directly.
