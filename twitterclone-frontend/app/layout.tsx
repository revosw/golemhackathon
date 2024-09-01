import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "./QueryClientProvider";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
        <html lang="en">
			<Provider>
                <body className={inter.className}>
                    <div className="min-h-screen bg-gray-100">
                        <Navbar />
                        <main className="container mx-auto px-4 py-8">{children}</main>
                    </div>
                </body>
			</Provider>
		</html>
	);
}
