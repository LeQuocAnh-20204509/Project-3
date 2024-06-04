import React from 'react';
import Image from "next/image"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {CircleUser} from "lucide-react";

const Page = () => {
    return (
        <div>
            <Avatar>
                <AvatarImage src="/api/users/1/profile-img" alt="avatar"/>
                {/*<AvatarFallback><CircleUser/></AvatarFallback>*/}
            </Avatar>
            <Image src="/api/users/1/profile-img" alt="avatar" width="100" height={100}/>
        </div>
    );
};

export default Page;