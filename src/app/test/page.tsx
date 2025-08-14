'use client'
import { Button } from "@/shared/ui/Button/Button"
import { DialogModal } from "@/shared/ui/Modal/DialogModal"
import { useState } from "react"

export default function Page()
{
    const [isOpen, setIsOpen] = useState(false)
    return(
        <div>
            <Button onClick={()=>setIsOpen(true)}>click</Button>
            <DialogModal isOpen={isOpen} onClose={()=>setIsOpen(false)} yesText="yes" noText="no" yesColor="warning" noColor="error" yesFunc={()=>{console.log("yes"); setIsOpen(false)}}>
                <p></p>
            </DialogModal>

        </div>
    )
}