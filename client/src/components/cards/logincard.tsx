import LoginForm from "@/forms/login-form";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function LoginCard() {
    return (
    <Card className="w-[400px]">
        <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
                Login with either
            </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-2">
                <Button className="w-full" variant="outline">
                    <span className="mr-1">
                        <GitHubLogoIcon />
                    </span>
                    <span>
                        Github
                    </span>
                </Button>
                <Button className="w-full" variant="outline">
                    <span className="mr-1">
                        <img src="/google-icon.svg" alt="Google" width="18" height="18" />
                    </span>
                    <span>
                        Google    
                    </span>
                </Button>
            </div>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                    </span>
                </div>
            </div>
            <div className="grid gap-2">
                <LoginForm />
            </div>
        </CardContent>
    </Card>
    )
}