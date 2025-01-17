// Purpose: Define the layout for the application. This is the root layout that will be used for all pages.
// This layout is used to define the global styles for the application.
// The layout incorporates the Navbar, Footer, and the main content of the page.
// This is also where the sheet of paper effect is achieved; The entirety of the page looks like its on a sheet of paper, with a shadow around the edges.
// This effect is achieved by keeping the body as a background while the children are wrapped in a div with a paper-esq background and a shadow, that's width is less than a full page width.
// Color Scheme: FE904F, 4076FF, and dark being 333333
import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import Navigation from "@/components/nav";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
    title: "ForeSite",
    description: "Providing you with all your property needs",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="bg-body h-screen flex flex-col items-center justify-center">
        <Navigation />
        <div className="">
            {children}
        </div>
        <Footer />
        </body>
        </html>
    );
}
