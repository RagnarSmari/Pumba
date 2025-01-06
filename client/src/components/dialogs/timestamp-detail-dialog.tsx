import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {DialogClose} from "@radix-ui/react-dialog";
import {Timestamp} from "@/types/timestamp";
import useSWR, {mutate} from "swr";
import {ApiResponse} from "@/types/common";
import {pumbaFetcher} from "@/swr/fetcher";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {ChevronRight} from "lucide-react";
import {Comment} from "@/types/comment";


type TimestampDetailDialogProps = {
    trigger?: React.ReactNode,
    id: number
    isOpen: boolean
    onOpenChange: (value: (((prevState: boolean) => boolean) | boolean)) => void
}


export default function TimestampDetailDialog({ trigger, id, isOpen, onOpenChange } : TimestampDetailDialogProps){
    const [newComment, setNewComment] = React.useState("");
    const apiURL = process.env.NEXT_PUBLIC_PUMBA_API_URL;
    const url = `${apiURL}${"/timestamp/" + id}`;
    const { data, isLoading, error } = useSWR<ApiResponse<Timestamp>>(url, pumbaFetcher)
    var comments: Comment[] = []

    if (data){
        if (data.data){
            comments = data.data.Comments;
        }
    }
    
    const handleAddComment = async () => {
        if (newComment.trim() !== "") {
            const res = await fetch(`${apiURL}/comment/`, { method: 'POST', credentials: 'include', body: JSON.stringify({ message: newComment, timestampId: id }) });
            if (!res.ok){
                throw new Error("Failed to add comment");
            }
            console.log("New Comment Submitted:", newComment);
            comments.push({
                Id: Math.random(), // Temporary ID, replace with real one after API call
                Message: newComment,
                TimestampId: id,
                CreatedByUserName: "Current User" // Adjust if username is available
            })
            setNewComment("");
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Timestamp Details</DialogTitle>
                    <DialogDescription>
                        Below are the detailed properties of the selected timestamp.
                    </DialogDescription>
                </DialogHeader>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {!isLoading && !error && data && (
                    <div className="space-y-4">
                        {/* Timestamp Details */}
                        <div className="border-b pb-4">
                            <p>
                                <strong>Created At:</strong>{" "}
                                {new Date(data.data.CreatedAt).toLocaleString()}
                            </p>
                            <p>
                                <strong>ID:</strong> {data.data.Id}
                            </p>
                            <p>
                                <strong>Job Name:</strong> {data.data.JobName || "N/A"}
                            </p>
                            <p>
                                <strong>Total Hours:</strong> {data.data.TotalHours} hrs
                            </p>
                            <p>
                                <strong>Total Minutes:</strong> {data.data.TotalMinutes} mins
                            </p>
                            <p>
                                <strong>Username:</strong> {data.data.UserName}
                            </p>
                        </div>

                        {/* Comments Section */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Comments</h3>
                            {comments.length ? (
                                <ul className="list-disc list-inside space-y-1">
                                    {comments.map((comment, index) => (
                                        <li key={index}>{comment.Message}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No comments available.</p>
                            )}
                        </div>

                        {/* Add Comment section */}
                        <div className="mt-4 border-t pt-4 flex items-center space-x-2">
                            <Textarea 
                                placeholder="Add a comment"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}/>
                            <Button variant="outline" size="icon" onClick={handleAddComment}>
                                <ChevronRight />
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
            <DialogClose/>
        </Dialog>
    )
} 