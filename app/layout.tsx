import "@/app/ui/global.css";
// import "@/components/NavMenu/NavMenu.css";
import { Poppins } from "next/font/google";
import { Metadata } from "next";
import NavMenu from "@/components/NavMenu/NavMenu";
import FooterComponent from "@/components/footer/footer";
import HeaderComponent from "@/components/header/header";
import { ReduxProvider } from "./redux/counter/provider";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "MultiAplication appointments and utilities",
  icons: { icon: "/logo.png" },
};
//“children” represent the react pages (app/page.tsx).
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <HeaderComponent />
        </header>
        <NavMenu />
        <main>
          <ReduxProvider>{children}</ReduxProvider>
        </main>
        <footer>
          <FooterComponent />
        </footer>
      </body>
    </html>
  );
}
