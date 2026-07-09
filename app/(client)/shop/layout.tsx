import { ClerkProvider } from '@clerk/nextjs'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from 'next';

export const metadat: Metadata = {
  title: {
    template: "%s - Shopcart online store",
    default: "Shopcart online store",
  },
  description: "Shopcart online store, Your one stop shop for all your need"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </ClerkProvider>
  );
}
