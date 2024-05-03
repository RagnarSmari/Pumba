import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function NavBar() {
    return (
        <header className="flex items-center justify-between container px-4 py-2 border-b border-gray-200">
            <div className="w-1/2 text-xl flex justify-start items-center">
                <Button variant={"ghost"}  size={"icon"}>
                    <HamburgerMenuIcon />
                </Button>
            </div>
            <div className="w-1/2 flex justify-end items-center">
                <Avatar>
                    <AvatarImage src="/avatar.jpg"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}
