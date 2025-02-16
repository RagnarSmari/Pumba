export interface Job {
    Id: number;
    Name: string;
    JobNr: number
    TotalHours: number;
}

export interface JobRequest {
    name: string;
    jobNr: number
}