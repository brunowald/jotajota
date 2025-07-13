import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./bootstrap.custom.scss";
import JJNavbar from "./components/JJNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JJNavbar />
        {children}
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
