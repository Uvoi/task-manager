import { BiHome } from "react-icons/bi"
import { Link } from "../Link/Link"
import { Tabs } from "./types"
import { CiSettings } from "react-icons/ci"

const TABS:Tabs[] = [
    { name: 'Home', path: '/' , type: 'icon', icon:<BiHome/>},
    { name: 'To Do', path: '/todo' },
    { name: 'In Progress', path: '/in-progress' },
    { name: 'Done', path: '/done' },
    { name: 'Settings', path: '/settings', type: 'icon', icon:<CiSettings/>},
]

export const Header = () =>
{
    return(
        <div className="flex w-full justify-center gap-4 p-4">
            {TABS.map(tab => (
                tab.type === 'icon' 
                ? <Link key={tab.name} href={tab.path} hoverStyle='border'>{tab.icon}</Link>
                : <Link hoverStyle='border' key={tab.name} href={tab.path}>{tab.name}</Link>
            ))}
        </div>
    )
}