import { ClerkProvider } from '@clerk/nextjs';
import Sidebar from './components/sidebar';
import './globals.css';

export const metadata = {
  title: 'My Todo App',
  description: 'A Next.js Todo app with Clerk authentication',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="ko">
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          />
        </head>

        <body className="antialiased flex min-h-screen">
          <Sidebar />
          <main className="flex-1 bg-slate-50">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
