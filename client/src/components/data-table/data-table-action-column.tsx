import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import {useTranslations} from "next-intl";


export default function DataTableActionColumn() {
    const t = useTranslations('Columns')
    return (
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">{t('OpenMenu')}</span>
                  <MoreHorizontal className="h-4 w-4" />
              </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('Actions')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t('Edit')}</DropdownMenuItem>
              <DropdownMenuItem>{t('Delete')}</DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>

    );
}