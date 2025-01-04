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


type DataTableActionColumnFunctionCallback = () => void;
interface DataTableActionColumnProps {
    OnEditCallback?: DataTableActionColumnFunctionCallback,
    OnDeleteCallback?: DataTableActionColumnFunctionCallback,
    OnOverviewCallback?: DataTableActionColumnFunctionCallback
}

export default function DataTableActionColumn({ OnEditCallback, OnDeleteCallback, OnOverviewCallback} : DataTableActionColumnProps) {
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
              {OnEditCallback !== undefined &&
                  <DropdownMenuItem>{t('Edit')}</DropdownMenuItem>}
              {OnDeleteCallback !== undefined &&
                  <DropdownMenuItem>{t('Delete')}</DropdownMenuItem>}
              {OnOverviewCallback !== undefined && 
                  <DropdownMenuItem
                      onClick={() => OnOverviewCallback()}
                  >{t('Overview')}</DropdownMenuItem>}
          </DropdownMenuContent>
      </DropdownMenu>

    );
}