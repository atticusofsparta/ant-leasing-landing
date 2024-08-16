import { ANTRecord } from '@ar.io/sdk';
import { camelToReadable, formatArweaveAddress } from '@src/utils';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import TableView from './DataTable';

interface TableData {
  name: string;
  targetId: string;
  ttlSeconds: number;
  underAntId: string;
  startDate: string;
  endDate: string;
  purchaseType: string;
  purchasePrice: number;
}

const columnHelper = createColumnHelper<TableData>();

const UndernamesTable = ({
  undernames,
  loading,
}: {
  undernames: Record<
    string,
    ANTRecord & {
      startTimestamp?: number;
      processId?: string;
      purchaseType?: string;
      purchasePrice?: number;
    }
  >;
  loading: boolean;
}) => {
  const [tableData, setTableData] = useState<Array<TableData>>([]);

  useEffect(() => {
    if (undernames) {
      const newTableData = Object.entries(undernames).map(
        ([undername, record]) => ({
          name: undername,
          targetId: formatArweaveAddress(record.transactionId),
          ttlSeconds: record.ttlSeconds,
          underAntId: record.processId
            ? formatArweaveAddress(record.processId)
            : '',
          startDate: record.startTimestamp
            ? new Date(record.startTimestamp).toDateString()
            : '',
          endDate: (record as any)?.endTimestamp
            ? new Date((record as any).endTimestamp).toDateString()
            : 'Permanent',
          purchaseType: record.purchaseType ?? '',
          purchasePrice: record.purchasePrice ?? '',
        }),
      );

      setTableData(newTableData as TableData[]);
    }
  }, [undernames, loading]);

  // Define columns for the table
  const columns: ColumnDef<TableData, any>[] = [
    'name',
    'targetId',
    'ttlSeconds',
    'underAntId',
    'startDate',
    'endDate',
    'purchaseType',
  ].map((key) =>
    columnHelper.accessor(key as keyof TableData, {
      id: key,
      header: camelToReadable(key),
      sortDescFirst: true,
    }),
  );

  return (
    <div>
      <div className="flex w-full items-center rounded-t-lg border border-foreground py-[0.9375rem] pl-6 pr-[0.8125rem] backdrop-blur-sm">
        <div className="grow text-sm text-xl text-secondary">Undernames</div>
      </div>
      <TableView
        columns={columns}
        data={tableData || []}
        isLoading={loading}
        noDataFoundText="No undernames found."
        defaultSortingState={{ id: 'name', desc: true }}
      />
    </div>
  );
};

export default UndernamesTable;
