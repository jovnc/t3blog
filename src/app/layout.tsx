import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import NavBar from "@/components/nav/NavBar";
import { ThemeProvider } from "@/components/dark-light-mode/theme-provider";
import { Toaster } from "@/components/ui/sonner";
// import { SessionProvider } from "next-auth/react";
// import { auth } from "@/auth";

export const metadata = {
  title: "T3 Blog",
  description: "Made with T3 Stack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        {/* <SessionProvider session={session}> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#f1eafc] to-[#cacbd5] dark:bg-gradient-to-b dark:from-[#2e026d] dark:to-[#15162c]">
              <NavBar />
              {children}
            </div>
            <Toaster />
          </TRPCReactProvider>
        </ThemeProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
