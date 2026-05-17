import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-grow min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
