import Navbar from "../components/Navigation";
import Footer from "../components/Footer";
import SmoothScroll from "../components/utils/lenis";
import { SiteModalProvider } from "../components/site/modal-context";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteModalProvider>
      <SmoothScroll />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </SiteModalProvider>
  );
}
