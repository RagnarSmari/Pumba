import { Comment } from "./comment";

export class Timestamp {
    Id: number;
    TotalHours: number;
    TotalMinutes: number;
    JobName: string;
    UserName: string;
    CreatedAt: Date;
    Comments: Comment[];

    constructor(
        Id: number,
        TotalHours: number,
        TotalMinutes: number,
        JobName: string,
        UserName: string,
        CreatedAt: Date,
        Comments: Comment[] = []
    ) {
        this.Id = Id;
        this.TotalHours = TotalHours;
        this.TotalMinutes = TotalMinutes;
        this.JobName = JobName;
        this.UserName = UserName;
        this.CreatedAt = CreatedAt;
        this.Comments = Comments;
    }
}