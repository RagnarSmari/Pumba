import {
    Table,
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@/components/ui/table";
import {GetAllJobs} from "@/services/jobs/jobsService";
import {cookies} from "next/headers";


export default async function Jobs() {
    let jobs = await GetAllJobs();
    return (
        <Table>
            <TableCaption>Jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[99px]">Id</TableHead>
                    <TableHead>Name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {jobs.map((job) => (
                    <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.id}</TableCell>
                        <TableCell>{job.name}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}