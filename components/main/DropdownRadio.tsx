"use client";
import {
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

interface DropdownRadioProps<Type extends string> {
  options: readonly Type[];
  value: Type;
  onValueChange: (value: Type) => void;
}

export function DropdownRadio<Type extends string>(
  {
    options,
    value,
    onValueChange
  }: DropdownRadioProps<Type>
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          {value}
          <HugeiconsIcon icon={ArrowDown01Icon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            Date Preference
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={value}
            onValueChange={(val) => onValueChange(val as Type)}
          >
            {
              options.map(option => {
                return (
                  <DropdownMenuRadioItem
                    key={option}
                    value={option}
                  >
                    {option}
                  </DropdownMenuRadioItem>
                );
              })
            }
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
