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
import {Dispatch, SetStateAction} from "react";
import {getPaginationRowModel} from "@tanstack/table-core";
import {Pagination} from "@/types/pagination";
import {LoadingSpinner} from "@/components/loading-spinner";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    rowCount: number;
    pagination: Pagination; 
    setPagination: Dispatch<SetStateAction<Pagination>>
    setSorting: Dispatch<SetStateAction<SortingState>>
    sorting: SortingState
    isLoading: boolean,
    error: any, 
}

export function DataTable<TData, TValue>({
    columns,
    data,
    rowCount,
    setPagination,
    setSorting,
    pagination,
    sorting,
    isLoading,
    error,
}: DataTableProps<TData, TValue>){
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    
    const table = useReactTable({
        data,
        columns,
        rowCount,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        enableMultiSort: true,
        state: {
            sorting,
            columnFilters,
            pagination
        },
        manualPagination: true,
        onPaginationChange: setPagination
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
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center items-center justify-items-center">
                                    {/*Loading...*/}
                                    <LoadingSpinner />
                                </TableCell>
                            </TableRow>
                        ): table.getRowModel().rows?.length && !isLoading ? (
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
                                            {error ? (
                                                <p>Internal server error</p>
                                            ): (
                                                <p>
                                                    No data found.
                                                </p>
                                            )}
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
