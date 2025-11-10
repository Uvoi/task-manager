'use client'

import { useTagStore } from "@/shared/store/useTagStore"
import { Button } from "@/shared/ui/Button/Button/Button";
import { Chip } from "@/shared/ui/Chip/Chip"
import { Modal } from "@/shared/ui/Modal/Modal";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { AddNewTag } from "./AddNewTag";

interface TagsMenuProps
{
    selectable?: boolean;
    returnTag?: (id:number)=>void;
    show?: number[];
    className?: string;
}

export const TagsMenu = ({selectable, returnTag, show, className}:TagsMenuProps) =>
{
    const {tags, addTag, fetchTags} = useTagStore();
    const [openModal, setOpenModal] = useState(false)


    const addNewTag = (title: string, color: string,) =>
    {
        addTag({name:title, hex:color})
        console.log(title, '\n', color);
        setOpenModal(false);
        
        fetchTags();
    }

    const handleSelect = (id:number) =>
    {
        if (selectable && returnTag)
            returnTag(id)
    }

    useEffect(() => {
      fetchTags();
    }, [])
    

    console.log(tags)

    return(
        <div>
            <div className={`${className} flex gap-2 border-2 border-secondary rounded-[4px] p-2 flex-wrap items-center`}>
                { (selectable && returnTag) 
                    ?
                        tags
                            .filter(tag => !show || show.includes(tag.id))
                            .map((tag)=>(
                                <Button 
                                    key={tag.id}
                                    variant="tertiary"
                                    onClick={()=>handleSelect(tag.id)}
                                    className="!p-1"
                                >
                                    <Chip value={tag.name} color={tag.hex}/>
                                </Button>
                            ))
                    :
                        tags
                            .filter(tag => !show || show.includes(tag.id))
                            .map((tag)=>(
                                <Chip key={tag.id} value={tag.name} color={tag.hex}/>
                            ))
                }
                <Button 
                    className="aspect-square h-fit !p-1 !rounded-[50%]"
                    onClick={()=>setOpenModal(true)} 
                >
                    <BiPlus/>
                </Button>
            </div>
            <Modal isOpen={openModal} onClose={()=>setOpenModal(false)} title="Add new tag">
                <AddNewTag onSave={addNewTag}/>
            </Modal>
        </div>
    )
}