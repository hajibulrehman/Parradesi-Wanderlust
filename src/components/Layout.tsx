import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DepartureTicker from "./DepartureTicker";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <DepartureTicker />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
