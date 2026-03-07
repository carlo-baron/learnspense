"use client";
import Link from "next/link";
import { 
  Home01Icon,
  DashboardSquare02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { usePathname } from "next/navigation";

export function Navbar(){
  const pathname = usePathname();
  const defaultValue = pathname.split('/')[1] === "dashboard" ? "dashboard" : "home"
  return(
    <nav
    className='px-4 flex justify-center items-center h-8 w-full relative top-0'
    >
      <p className='absolute left-4'>LearnSpense</p>
      <Tabs defaultValue={defaultValue}>
        <TabsList>
          <TabsTrigger
          value='home'
          >
            <Link href='/'>
              <HugeiconsIcon icon={Home01Icon} />
            </Link>
          </TabsTrigger>
          <TabsTrigger
          value='dashboard'
          >
            <Link href='/dashboard'>
              <HugeiconsIcon icon={DashboardSquare02Icon} />
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </nav>
  );
}
