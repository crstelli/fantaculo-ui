import { Suspense } from "react";
import { DataDisplay } from "./components/DataDisplay";

const PAYLOAD = {
  competition_id: 368811,
  league_name: "fantaantoniosavarese",
};

async function fetchData() {
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

export default function App() {
  const dataPromise = fetchData();
  return (
    <Suspense fallback={"Loading"}>
      <DataDisplay dataPromise={dataPromise} />
    </Suspense>
  );
}
