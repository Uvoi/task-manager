import { Button } from "@/shared/ui/Button/Button/Button";
import { Chip } from "@/shared/ui/Chip/Chip";
import { Input } from "@/shared/ui/Input/Input"
import { useState } from "react"

interface AddNewTagProps
{
    onSave: (title: string, color: string) => void;
}

export const AddNewTag = ({
     onSave}: AddNewTagProps) =>
{
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('');
    const [isValid, setIsValid] = useState({title: false, color: false})

    const handleSetTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        const newTitle = event.target.value;
        if (newTitle.length <= 32) {
            setTitle(newTitle);
        }
        setIsValid({...isValid, title: (newTitle.length > 0 && newTitle.length<=32)})
    }

    const handleSetColor = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        let newColor = event.target.value;
        
        newColor = newColor.replace('#', '');
        
        newColor = newColor.replace(/[^a-fA-F0-9]/g, '');
        
        if (newColor.length <= 6) {
            setColor(newColor);
        }
        setIsValid({...isValid, color: isValidHexColor(newColor)})
    }

    const displayColor = color;
    
    const isValidHexColor = (color: string): boolean => {
        return /^([A-Fa-f0-9]{6})$/.test(color);
    }

    const handleSave = () =>
    {
        onSave(title, color);
    }

    return(
        <div className="flex flex-col w-2/3 self-center gap-6">
            <Input 
                placeholder="title" 
                value={title}
                onChange={handleSetTitle}
                maxLength={32}
                error={!isValid.title}
                
            />
            <div className="flex w-full gap-4">
                <div 
                    className="w-1/6 aspect-square border border-gray-300 rounded"
                    style={{ backgroundColor: isValid.color ? `#${color}` : 'transparent' }}
                />
                <div className="flex w-full">
                    <span className="px-2 py-2 border border-r-0 border-gray-300 rounded-l align-middle">
                        #
                    </span>
                    <Input 
                        className="w-full rounded-l-none"
                        value={displayColor}
                        onChange={handleSetColor}
                        placeholder="RRGGBB"
                        maxLength={6}
                        error={!isValid.color}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <Chip 
                    value={title ? title : '_'}
                    color={color}
                />
            </div>
            <Button onClick={handleSave} disabled={!isValid.title || !isValid.color}>Save</Button>
        </div>
    )
}