import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SlotSync — Build your semester without the clashes",
  description:
    "Find the best retake and improvement sections, detect routine conflicts, and generate an optimized semester schedule in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('slotsync_theme');
                  let isMotionBlack = false;
                  if (stored) {
                    const parsed = JSON.parse(stored);
                    const t = parsed && parsed.state && parsed.state.theme;
                    if (t === 'motion-black' || t === 'dark') {
                      isMotionBlack = true;
                    }
                  }
                  if (isMotionBlack) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'motion-black');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'warm-light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-indigo-500 selection:text-white transition-colors duration-200">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
