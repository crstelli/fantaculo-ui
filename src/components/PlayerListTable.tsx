import { Stack } from "@mantine/core";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { use } from "react";

interface Props {
  dataPromise: Promise<Player[]>;
}

interface Player {
  name: string;
  team: string;
  expectedFantamedia: string;
  expectedTitolarita: string;
}

function PlayerListTable({ dataPromise }: Props) {
  const rows = use(dataPromise);

  const cols: ColDef<Player>[] = [
    { field: "name", headerName: "Nome" },
    { field: "team", headerName: "Squadra" },
    { field: "expectedFantamedia", headerName: "Fantamedia Attesa (xFm)" },
    {
      field: "expectedTitolarita",
      headerName: "Titolaritá Attesa (xTit)",
      valueFormatter: (params) => `${params.value}%`,
    },
  ];

  const renderCols = () => cols.map((col) => ({ ...col, flex: 1 }));

  return (
    <Stack h="100vh">
      <AgGridReact columnDefs={renderCols()} rowData={rows} />
    </Stack>
  );
}

export { PlayerListTable };
