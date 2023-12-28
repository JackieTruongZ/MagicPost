import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from "@/app/components/navBar";
import Footer from "@/app/components/footer";
import { Provider } from 'react-redux';
import '../public/theme/theme.css';
import '../node_modules/primeflex/primeflex.css';
import 'primeicons/primeicons.css';
        
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MagicPost',
  description: 'MagicPost best of delivery',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <NavBar/>
          <main className='w-full'>
            {children}
          </main>
          <Footer/>
        </body>
    </html>
  )
}
