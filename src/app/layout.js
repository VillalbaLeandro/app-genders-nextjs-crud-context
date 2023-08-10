"use client"
import "bootstrap/dist/css/bootstrap.css"
import './globals.css'
import { GenderProvider } from "../context/GendersContext";
import { Navbar } from "@/components/Navbar";
import { Toaster } from 'react-hot-toast';




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Crud genders" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AppGenders</title>
      </head>
      <body  className="bg-light" >
        <GenderProvider>
          <Navbar />
          <Toaster />
          <main  className="d-flex flex-column align-items-center mt-3 ">
          {children}
          </main>
        </GenderProvider>
      </body>
    </html>
  )
}
