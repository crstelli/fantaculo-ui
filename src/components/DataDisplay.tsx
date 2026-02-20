import { use } from "react";

interface Props {
  dataPromise: Promise<unknown>;
}

function DataDisplay({ dataPromise }: Props) {
  const { rosters_evaluation } = use(dataPromise);

  return (
    <div>
      {rosters_evaluation.map((team) => (
        <div key={team.team_id}>
          {team.team_name} {team.evaluation.ALL.fm_top}
        </div>
      ))}
    </div>
  );
}

export { DataDisplay };
