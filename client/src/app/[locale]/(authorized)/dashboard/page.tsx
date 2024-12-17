import Link from "next/link"
import {
    Activity,
    ArrowUpRight,
    CreditCard,
    DollarSign,
    Users,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function Dashboard() {
    return (
        <div className="grid row container">
            <div>
                Klukka
            </div>
            <div className="col-auto">
                Seinustu 5 skráningar
            </div>
            <div>
               Skrá tíma takki eða form 
            </div>
            <div>
                Viðvera frá fyrsta hvers mánaðar / viðvera yfir allt tímabilið
            </div>
        </div>
    )
}
