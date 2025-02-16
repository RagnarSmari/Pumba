"use client";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { RoleNames, UserRole } from "@/types/users";
import {useTranslations} from "next-intl";


export interface UserRoleSelectProps{
    role?: number;
    onChange: (value: number) => void;
}

export default function UserRoleSelect({ role, onChange }: UserRoleSelectProps){
    const t = useTranslations("Users")
    
    return (
        <Select value={role?.toString()} onValueChange={(v) => onChange(Number(v))}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a role"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {Object.values(UserRole).filter(key => typeof key === 'number').map((key) => (
                        <SelectItem key={key} value={key.toString()}>
                            {RoleNames[key as UserRole]}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}