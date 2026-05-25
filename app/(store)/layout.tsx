import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ModeWrapper from "../../components/layout/ModeWrapper";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ModeWrapper>
      <Header />
      <main className="flex-grow min-h-screen">
        {children}
      </main>
      <Footer />
    </ModeWrapper>
  );
}
