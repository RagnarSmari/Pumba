import MainNavbar from "@/components/navbar/main-navbar";

type LayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: LayoutProps) {
    return (
        <>
            <MainNavbar />
            <main className="w-full max-w-screen-2xl mx-auto px-4 pt-4">
                {children}
            </main>
        </>
    );
}
