import { ClerkProvider } from '@clerk/nextjs'
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
