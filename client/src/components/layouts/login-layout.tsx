
type LayoutProps = {
    children: React.ReactNode;
};

export default function LoginLayout({children}: LayoutProps) {
    return (
        <>
            <main>
                {children}
            </main>
        </>
    )
}