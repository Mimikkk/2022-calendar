import { getCoreRowModel, TableOptions, useReactTable } from '@tanstack/react-table';

export const useTable = <T>(options: Omit<TableOptions<T>, 'getCoreRowModel'>) =>
  useReactTable({ getCoreRowModel: getCoreRowModel(), ...options });
