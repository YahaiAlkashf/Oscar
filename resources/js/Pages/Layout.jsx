import Footer from "@/Components/ComponentsIndex/Footer";
import Header from "@/Components/ComponentsIndex/Header";
import FloatingButtons from "@/Components/FloatingButtons";
import react from "react";
import { useState } from "react";



export default function Layout({ children }){

    return(
    <>
        <div dir="rtl" >
            <Header />

         <main >
          {children}
          <FloatingButtons />
         <Footer />
         </main>
        </div>
    </>
    );
}
