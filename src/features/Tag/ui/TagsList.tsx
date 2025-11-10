'use client'

import { useTagStore } from "@/shared/store/useTagStore"
import { Button } from "@/shared/ui/Button/Button/Button";
import { Chip } from "@/shared/ui/Chip/Chip"
import { Modal } from "@/shared/ui/Modal/Modal";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { AddNewTag } from "./AddNewTag";
import { TagsMenu } from "./TagsMenu";

interface TagsListProps
{
    show?: number[];
    className?: string;
    onTagSelect?: (id:number)=>void;
}

export const TagsList = ({show, className, onTagSelect}:TagsListProps) =>
{
    const {tags, addTag, fetchTags} = useTagStore();
    const [openMenu, setOpenMenu] = useState(false)

    useEffect(() => {
      fetchTags();
    }, [])
    

    console.log(tags)

    return(
        <div>
            <div className={`${className} flex gap-2 p-2 flex-wrap items-center`}>
                {tags.map((tag)=>(
                    (show && show.includes(tag.id)) && 
                        <Chip value={tag.name} key={tag.id} color={tag.hex}/>
                ))}
                <Button 
                    className="aspect-square h-fit !p-1 !rounded-[50%]"
                    onClick={()=>setOpenMenu(true)} 
                >
                    <BiPlus/>
                </Button>
            </div>
            <Modal isOpen={openMenu} onClose={()=>setOpenMenu(false)} >
                <TagsMenu selectable returnTag={onTagSelect}/>
            </Modal>
        </div>
    )
}