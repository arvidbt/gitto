import { Button } from "@/components/ui/button";
import { type Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";

type SharedReposDataTableRowActionsProps<TData> = {
  row: Row<TData>;
  onDelete: (value: TData) => void;
};
export default function SharedReposDataTableRowActions<TData>({
  row,
  onDelete,
}: SharedReposDataTableRowActionsProps<TData>) {
  return (
    <>
      <Button variant={"destructive"} onClick={() => onDelete(row.original)}>
        <Trash className="h-4 w-4" />
      </Button>
    </>
  );
}
