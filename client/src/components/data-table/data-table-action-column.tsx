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
import {routing, usePathname, useRouter} from "@/i18n/routing";


type DataTableActionColumnFunctionCallback = () => void;
interface DataTableActionColumnProps {
    OnEditHref?: string,
    OnDeleteCallback?: DataTableActionColumnFunctionCallback,
    OnOverviewCallback?: DataTableActionColumnFunctionCallback,
    children?: React.ReactNode,
}

export default function DataTableActionColumn({ OnEditHref, OnDeleteCallback, OnOverviewCallback, children} : DataTableActionColumnProps) {
    const t = useTranslations('Columns')
    const router = useRouter();
    const path = usePathname();
    const navigate = (href : typeof path) => router.push(href)
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
              {OnEditHref !== undefined &&
                      <DropdownMenuItem onClick={() => navigate(OnEditHref)}>{t('Edit')}</DropdownMenuItem>
              }
              {OnDeleteCallback !== undefined &&
                      <DropdownMenuItem onClick={OnDeleteCallback}>{t('Delete')}</DropdownMenuItem>
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