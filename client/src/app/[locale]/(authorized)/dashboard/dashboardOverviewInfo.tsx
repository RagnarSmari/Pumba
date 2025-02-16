import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";


export default function DashboardOverviewInfo() {
    
    return (
        <Card>
            <CardHeader>
                <div className={"flex justify-between"}>
                    <CardTitle className={"font-light"} >Presence</CardTitle>
                    <CardTitle >15. February 2025</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-center">
                    <h3 className="text-4xl font-bold text-gray-800">10 / 160 hrs</h3>
                </div>
            </CardContent>
        </Card>
        
    )
}