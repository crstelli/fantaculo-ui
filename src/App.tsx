import "@mantine/core/styles.css";

import { Suspense } from "react";
import { MantineProvider, Tabs } from "@mantine/core";
import { PlayerList } from "./pages/playerList/PlayerListTable";
import { AgGridProvider } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
import { Leaderboard } from "./pages/leaderboard/Leaderboard";

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
      <AgGridProvider modules={modules}>
        <Tabs defaultValue="leaderboard" h={"100vh"}>
          <Tabs.List>
            <Tabs.Tab value="playerList">Listone</Tabs.Tab>
            <Tabs.Tab value="leaderboard">Classifica</Tabs.Tab>
          </Tabs.List>
          <Suspense fallback={"Loading"}>
            <Tabs.Panel h={"100%"} value="leaderboard">
              <Leaderboard dataPromise={teamDataPromise} />
            </Tabs.Panel>
            <Tabs.Panel h={"100%"} value="playerList">
              <PlayerList dataPromise={playerListPromise} />
            </Tabs.Panel>
          </Suspense>
        </Tabs>
      </AgGridProvider>
    </MantineProvider>
  );
}
