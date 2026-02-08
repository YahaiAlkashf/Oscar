import react from "react";
import { useState } from "react";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";

export default function Layout({ children }){
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    return(
    <>
        <div dir="rtl" className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
         <Header setIsOpen={setSidebarIsOpen} isOpen={sidebarIsOpen}/>
         <Sidebar setIsOpen={setSidebarIsOpen} isOpen={sidebarIsOpen}/>
         <main className={`transition-all duration-300 ${sidebarIsOpen ? 'mr-64' : 'mr-24'} p-4`}>
          {children}
         </main>
        </div>
    </>
    );
}
