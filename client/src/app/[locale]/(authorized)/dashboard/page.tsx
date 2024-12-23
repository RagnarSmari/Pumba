import RealTimeClock from "@/components/real-time-clock/real-time-clock";
import {Button} from "@/components/ui/button";

export default function Dashboard() {
    return (
        <div>
            <div className="flex justify-start pb-6">
                <h3 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Góðan dag, Ragnar
                </h3>
            </div>
            <div className="grid grid-cols-2 container">
                <div className="grid grid-cols-1 justify-center">
                <div className="justify-items-center">
                        <RealTimeClock/>
                    </div>
                    <div>
                        <Button className="w-full">Stimpla inn</Button>
                    </div>
                </div>
                <div className="col-auto">
                    Seinustu 5 skráningar
                </div>
                <div>

                </div>
                <div>
                    Viðvera frá fyrsta hvers mánaðar / viðvera yfir allt tímabilið
                </div>
            </div>
        </div>

    )
}
