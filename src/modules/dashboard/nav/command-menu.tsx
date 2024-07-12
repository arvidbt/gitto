"use client";

import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  FolderSymlink,
  Settings,
  Smile,
  Unplug,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export function CommandDialogMenu() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="hidden md:block">
      <p className="text-sm text-muted-foreground">Press CTRL+J</p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          className="border-2 border-github-foreground bg-github-secondary text-github-white"
        />
        <CommandList className="border-2 border-github-foreground bg-github-secondary text-github-white">
          <CommandEmpty className="border-2 border-github-foreground bg-github-secondary text-github-white">
            No results found.
          </CommandEmpty>
          <CommandGroup
            heading="Quick Access"
            className="border-2 border-github-foreground bg-github-secondary text-github-white"
          >
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
            <CommandItem>
              <Unplug className="mr-2 h-4 w-4" />
              <span>Get API Status</span>
            </CommandItem>
            <CommandItem>
              <FolderSymlink className="mr-2 h-4 w-4" />
              <span>Create Link</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Active Links"></CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
