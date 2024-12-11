// import "./globals.css"
// import { Inter } from 'next/font/google'
// import { ClerkProvider } from '@clerk/nextjs'
// import { Navbar } from "@/components/Navbar"
// import { BasketProvider } from "@/contexts/BasketContext"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata = {
//   title: "SmartVision - Intelligent Vision Processing",
//   description: "Advanced computer vision solutions for business needs",
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <ClerkProvider>
//       <BasketProvider>
//         <html lang="en">
//           <body className={inter.className}>
//             <Navbar />
//             {children}
//           </body>
//         </html>
//       </BasketProvider>
//     </ClerkProvider>
//   )
// }



import "./globals.css"
import { Inter } from 'next/font/google'
import { Navbar } from "@/components/Navbar"
import { BasketProvider } from "@/contexts/BasketContext"

const inter = Inter({ subsets: ["latin"] })
export const metadata = {
  title: "SmartVision - Intelligent Vision Processing",
  description: "Advanced computer vision solutions for business needs",
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <BasketProvider>
    <BasketProvider>
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  </BasketProvider>
  )
}