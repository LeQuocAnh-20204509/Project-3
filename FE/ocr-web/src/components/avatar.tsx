import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {CircleUser} from "lucide-react";

export function AvatarUser() {
    return (
        <Avatar>
            <AvatarImage src="/api/me/profile-img" alt="avatar" />
            <AvatarFallback><CircleUser/></AvatarFallback>
        </Avatar>
    )
}
