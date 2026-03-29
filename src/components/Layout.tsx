import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FeedbackMicFab from "./feedback/FeedbackMicFab";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FeedbackMicFab />
    </div>
  );
}
