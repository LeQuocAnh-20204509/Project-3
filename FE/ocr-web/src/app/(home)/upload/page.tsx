import React from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const SubmissionsPage = () => {
    return (
        <div className={"w-[600px] py-10 px-5"}>
            <form encType="multipart/form-data" action="/api/submissions" method="post">
                <Input type="file" multiple={true} name="files" className={"h-[300px]"}>
                </Input>
                <Button type="submit">submit</Button>
            </form>
        </div>
    );
};

export default SubmissionsPage;