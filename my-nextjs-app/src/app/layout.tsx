// import type { Metadata } from "next";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "Summarist",
//   description: "Your book summary application",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body>
//         {children}
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import "./globals.css";
import { LibraryProvider } from "../LibraryContext";

export const metadata: Metadata = {
  title: "Summarist",
  description: "Your book summary application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LibraryProvider>
          {children}
        </LibraryProvider>
      </body>
    </html>
  );
}