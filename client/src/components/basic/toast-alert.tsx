import {useToast} from "@/components/ui/use-toast";


export interface ToastAlertProps {
    Title: string,
    Message: string
}

export default function ToastAlert(props : ToastAlertProps){
    const { toast } = useToast()
    toast({
        title: props.Title,
        description: props.Message,
        variant: "destructive"
    })
}