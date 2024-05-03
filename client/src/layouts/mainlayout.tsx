import {Outlet} from "react-router-dom";
import NavBar from "@/layouts/navbar.tsx";

export default function MainLayout() {
    return (
        <>
            <NavBar />
            {/* Body content */}
            <div className={"container"}>
                <Outlet />
            </div>
        </>
    )
}