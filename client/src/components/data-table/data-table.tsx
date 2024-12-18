"use client";

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {DataTablePagination} from "@/components/data-table/data-table-paginatiion";
import {useTranslations} from "next-intl";
import {Dispatch, SetStateAction } from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    rowCount: number;
    pagination: { pageIndex: number,  pageSize: number}
    setPaginationAction: Dispatch<SetStateAction<{
        pageIndex: number, 
        pageSize: number
    }>>;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    rowCount,
    setPaginationAction,
    pagination,
}: DataTableProps<TData, TValue>){
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    
    const t = useTranslations("DataTable")
    
    const table = useReactTable({
        data,
        columns,
        rowCount,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            pagination
        },
        manualPagination: true,
        onPaginationChange: setPaginationAction 
    });
    
    // Enable when we want to use the filter input
    return (
        <div>
            {/*<div className="flex items-center py-4">*/}
            {/*    <Input*/}
            {/*        placeholder="Filter names..."*/}
            {/*        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}*/}
            {/*        onChange={(event) =>*/}
            {/*            table.getColumn("name")?.setFilterValue(event.target.value)*/}
            {/*        }*/}
            {/*        className="max-w-sm"*/}
            {/*    />*/}
            {/*</div>*/}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {t('NoData')}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}
