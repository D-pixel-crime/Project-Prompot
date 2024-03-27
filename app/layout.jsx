import Navbar from "@components/Navbar";
import "@styles/globals.css";

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
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
};
export default RootLayout;
