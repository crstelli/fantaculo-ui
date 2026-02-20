import { Suspense } from "react";
import { DataDisplay } from "./components/DataDisplay";
import { MantineProvider } from "@mantine/core";
import { PlayerListTable } from "./components/PlayerListTable";
import { AgGridProvider } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";

const PAYLOAD = {
  competition_id: 368811,
  league_name: "fantaantoniosavarese",
};

async function fetchTeamData() {
  const res = await fetch(
    "https://fantaculo.it/pyengine-srv/api/v1/valutatore/lega",
    {
      method: "POST",
      body: JSON.stringify(PAYLOAD),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  // const res = await fetch(
  //   "https://fantaculo.it/pyengine-srv/api/v1/bestlineup?nomeLega=fantapalella&competitionId=546233&idSquadra=16499594",
  // );

  const data = await res.json();
  return data;
}

async function fetchPlayerList() {
  const res = await fetch(
    "https://fantaculo.it/leghe-srv/api/v1/aste/listone?credits=500&flagNoGoal=true&flagModDefense=false&competitionParticipants=8&name=null&flagSvincolati=false&flagMantra=false&auctionType=pma",
  );

  const json = await res.json();
  return json;
}

const modules = [AllCommunityModule];

export default function App() {
  const playerListPromise = fetchPlayerList();
  const teamDataPromise = fetchTeamData();

  return (
    <MantineProvider>
      <Suspense fallback={"Loading"}>
        <DataDisplay dataPromise={teamDataPromise} />
        <AgGridProvider modules={modules}>
          <PlayerListTable dataPromise={playerListPromise} />
        </AgGridProvider>
      </Suspense>
    </MantineProvider>
  );
}
