'use client'
import Footer from "@/src/components/ui/Footer";
import Header from "@/src/components/ui/Header";


export default function Layout({ children }: any) {
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
