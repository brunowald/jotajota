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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>JJ Circuito Cultural</title>
        <meta name="description" content="JJ Circuito Cultural: Comunidad, eventos, arte y cultura en Buenos Aires. Sumate a la comunidad más grande de Latinoamérica." />
        <meta name="theme-color" content="#0cf" />
        <link rel="icon" type="image/png" href="/logo-jj-2025.png" />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jjcircuitocultural.com.ar/" />
        <meta property="og:title" content="JJ Circuito Cultural" />
        <meta property="og:description" content="Comunidad, eventos, arte y cultura en Buenos Aires. Sumate a la comunidad más grande de Latinoamérica." />
        <meta property="og:image" content="/logo-jj-2025.png" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JJ Circuito Cultural" />
        <meta name="twitter:description" content="Comunidad, eventos, arte y cultura en Buenos Aires. Sumate a la comunidad más grande de Latinoamérica." />
        <meta name="twitter:image" content="/logo-jj-2025.png" />
      </head>
      <body>
        <JJNavbar />
        {children}
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
