import { Timestamp } from "@/types/timestamp";

const fakeData: Timestamp[] = [
    {
        Id: 1,
        TotalHours: 8,
        TotalMinutes: 45,
        JobName: "Frontend Development",
        UserName: "John Doe",
        CreatedAt: new Date("2025-01-01T10:00:00Z"),
        Comments: [
            {
                Id: 1,
                Message: "Completed initial design phase.",
                TimestampId: 1,
                CreatedByUserName: "John Doe"
            }
        ]
    },
    {
        Id: 2,
        TotalHours: 6,
        TotalMinutes: 30,
        JobName: "Backend API Integration",
        UserName: "Jane Smith",
        CreatedAt: new Date("2025-01-02T09:30:00Z"),
        Comments: [
            {
                Id: 2,
                Message: "Fixed API endpoint issues.",
                TimestampId: 2,
                CreatedByUserName: "Jane Smith"
            },
            {
                Id: 3,
                Message: "Added data validation.",
                TimestampId: 2,
                CreatedByUserName: "Jane Smith"
            }
        ]
    },
    {
        Id: 3,
        TotalHours: 7,
        TotalMinutes: 15,
        JobName: "UI Testing",
        UserName: "Alice Johnson",
        CreatedAt: new Date("2025-01-03T11:15:00Z"),
        Comments: [
            {
                Id: 4,
                Message: "Tested login page responsiveness.",
                TimestampId: 3,
                CreatedByUserName: "Alice Johnson"
            },
            {
                Id: 5,
                Message: "Reported dashboard issue.",
                TimestampId: 3,
                CreatedByUserName: "Alice Johnson"
            }
        ]
    },
    {
        Id: 4,
        TotalHours: 5,
        TotalMinutes: 0,
        JobName: "Code Review",
        UserName: "Mike Brown",
        CreatedAt: new Date("2025-01-04T08:00:00Z"),
        Comments: [
            {
                Id: 6,
                Message: "Reviewed and approved PR #42.",
                TimestampId: 4,
                CreatedByUserName: "Mike Brown"
            }
        ]
    },
    {
        Id: 5,
        TotalHours: 8,
        TotalMinutes: 45,
        JobName: "Frontend Development",
        UserName: "John Doe",
        CreatedAt: new Date("2025-01-01T10:00:00Z"),
        Comments: [
            {
                Id: 1,
                Message: "Completed initial design phase.",
                TimestampId: 1,
                CreatedByUserName: "John Doe"
            }
        ]
    },
];

export default fakeData;