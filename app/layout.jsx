import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { Suspense } from "react";

export const metadata = {
  title: "Prompot",
  description: "Create, share and find AI prompts.",
  icons: {
    icon: ["/favicon/favicon.ico?v=4"],
    apple: ["/favicon/apple-touch-icon.png?v=4"],
    shortcut: ["/favicon/apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Suspense fallback={null}>
            <div className="main">
              <div className="gradient" />
            </div>
            <main className="app">
              <Navbar />
              {children}
            </main>
          </Suspense>
        </Provider>
      </body>
    </html>
  );
};
export default RootLayout;
