import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
  NavigationMenuList
} from "../ui/navigation-menu";
import Link from "next/link";
import {
  Home01Icon,
  DashboardSquare02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react"
export function Navbar() {
  return (
    <NavigationMenu
      className='w-full max-w-none'
    >
      <p className='absolute left-4'>LearnSpense</p>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href='/'>
              <HugeiconsIcon icon={Home01Icon} />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href='/dashboard'>
              <HugeiconsIcon icon={DashboardSquare02Icon} />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
