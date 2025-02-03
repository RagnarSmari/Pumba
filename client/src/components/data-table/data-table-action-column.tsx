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
import React from "react";
import {DialogTrigger} from "@/components/ui/dialog";


type DataTableActionColumnFunctionCallback = () => void;
interface DataTableActionColumnProps {
    OnEditCallback?: DataTableActionColumnFunctionCallback,
    OnDeleteCallback?: DataTableActionColumnFunctionCallback,
    OnOverviewCallback?: DataTableActionColumnFunctionCallback,
    children?: React.ReactNode,
}

export default function DataTableActionColumn({ OnEditCallback, OnDeleteCallback, OnOverviewCallback, children} : DataTableActionColumnProps) {
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
                      <DropdownMenuItem onClick={OnEditCallback}>{t('Edit')}</DropdownMenuItem>
              }
              {OnDeleteCallback !== undefined &&
                      <DropdownMenuItem onClick={OnEditCallback}>{t('Delete')}</DropdownMenuItem>
              }
              {OnOverviewCallback !== undefined &&
                      <DropdownMenuItem
                          onClick={() => OnOverviewCallback()}
                      >{t('Overview')}</DropdownMenuItem>
              }
              {children}
          </DropdownMenuContent>
      </DropdownMenu>

    );
}