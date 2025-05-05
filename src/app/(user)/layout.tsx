'use client'
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Slider from "./home/components/Home";
import Header from "@/src/components/ui/Header";
import Footer from "@/src/components/ui/Footer";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Introduce", path: "/introduce" },
    { name: "Contact", path: "/contact" },
];

export default function Layout({ children }: any) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-1 bg-gray-50">{children}</main>

            {/* footer */}
            <Footer />
        </div>
    );
}
