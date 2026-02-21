import { Stack } from "@mantine/core";
import { AgGridReact } from "ag-grid-react";
import { use } from "react";

import type { ColDef } from "ag-grid-community";

interface Props {
  dataPromise: Promise<TeamEvaluation>;
}

interface Team {
  team_id: number;
  team_name: string;
  evaluation: {
    ALL: {
      fm_top: number;
    };
  };
}

interface TeamEvaluation {
  rosters_evaluation: Team[];
}

const cols: ColDef[] = [
  {
    field: "team_name",
    headerName: "Squadra",
  },

  {
    field: "evaluation",
    headerName: "Fantamedia attesa per partita (xFm)",
    valueFormatter: (row) => row.value.ALL.fm_top,
  },

  {
    field: "evaluation",
    headerName: "% di giocare in <11",
    valueFormatter: (row) => (row.value.ALL.less_11_top * 100).toFixed(2),
  },

  {
    field: "evaluation",
    headerName: "Valutazione Porta",
    valueFormatter: (row) => row.value.ALL.stats_per_role.P.fm_top,
  },

  {
    field: "evaluation",
    headerName: "Valutazione Difesa",
    valueFormatter: (row) => row.value.ALL.stats_per_role.D.fm_top,
  },

  {
    field: "evaluation",
    headerName: "Valutazione Centrocampo",
    valueFormatter: (row) => row.value.ALL.stats_per_role.C.fm_top,
  },

  {
    field: "evaluation",
    headerName: "Valutazione Attacco",
    valueFormatter: (row) => row.value.ALL.stats_per_role.A.fm_top,
  },
];

function Leaderboard({ dataPromise }: Props) {
  const { rosters_evaluation: rows } = use(dataPromise);

  return (
    <Stack h="100%">
      <AgGridReact columnDefs={cols} rowData={rows} />
    </Stack>
  );
}

export { Leaderboard };
