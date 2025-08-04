'use client'

import { BiHome } from "react-icons/bi"
import { Link } from "../Link/Link"
import { TabPaths, Tabs } from "./types"
import { CiSettings } from "react-icons/ci"
import { usePathname } from "next/navigation"

let TABS:Tabs[] = [
    { name: 'Home', path: '/' , type: 'icon', icon:<BiHome/>},
    { name: 'To Do', path: '/todo' },
    { name: 'In Progress', path: '/in-progress' },
    { name: 'Done', path: '/done' },
    { name: 'Settings', path: '/settings', type: 'icon', icon:<CiSettings/>},
]

export const Header = () =>
{
    const currentPath = usePathname() as TabPaths;
    if (currentPath) {
        TABS = TABS.map(tab => {
            if (tab.path === currentPath) {
                return { ...tab, isActive: true };
            }
                return { ...tab, isActive: false };
        });
    }
    console.log(TABS);

    return(
        <div className="flex w-full justify-between items-center p-4 h-[9vh]">
            <Link key={TABS[0].name} href={TABS[0].path} hoverStyle='border' 
                className={`[&_svg]:!h-[1.5rem] [&_svg]:!w-[1.5rem] ${TABS[0].isActive  && 'text-accent'}`}
            >
                {TABS[0].icon}
            </Link>
            <div className="flex justify-between items-center w-1/3">
                {TABS.slice(1,-1).map(tab => (
                    tab.type === 'icon' 
                    ? <Link key={tab.name} href={tab.path} hoverStyle='border' 
                        className={`[&_svg]:!h-[1.5rem] [&_svg]:!w-[1.5rem] ${tab.isActive  && 'text-accent'}`}
                    >
                        {tab.icon}
                    </Link>
                    : <Link hoverStyle='border' key={tab.name} href={tab.path} 
                        className={`text-[1.3rem] ${tab.isActive  && 'text-accent'}`}
                    >
                        {tab.name}
                    </Link>
                ))}
            </div>
            <Link key={TABS[TABS.length-1].name} href={TABS[TABS.length-1].path} hoverStyle='border' className="[&_svg]:!h-[1.5rem] [&_svg]:!w-[1.5rem]">{TABS[TABS.length-1].icon}</Link>
        </div>
    )
}