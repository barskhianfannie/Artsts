// Add the API key to an header object
const meta = {
  "x-dune-api-key": "wkQCNz0jbNLfOUisFMVhfDLu6gSpXrD4",
};
const header = new Headers(meta);

export interface StatusDune {
  execution_id: string;
  query_id: number;
  state: string;
  submitted_at: string;
  expires_at: string;
  execution_started_at: string;
  result_metadata: {};
}

export interface ResultsDune {
  execution_id: string;
  query_id: number;
  state: string;
  submitted_at: string;
  expires_at: string;
  execution_started_at: string;
  result: {
    rows: any;
    metadata: any;
  };
}

export interface QueryDune {
  execution_id: string;
  state: string;
}
export const duneFetcher = async (queryId: number) => {
  const response = await fetch(
    `https://api.dune.com/api/v1/query/${queryId}/execute`,
    {
      method: "POST",
      headers: header,
    }
  );
  const response_object: QueryDune = await response.json();
  return response_object;
};
export const duneStatusFetcher = async (executionId: string) => {
  const response = await fetch(
    `https://api.dune.com/api/v1/execution/${executionId}/status`,
    {
      method: "GET",
      headers: header,
    }
  );
  const response_object: StatusDune = await response.json();

  return response_object;
};

export const duneResultsFetcher = async (executionId: string) => {
  const response = await fetch(
    `https://api.dune.com/api/v1/execution/${executionId}/results`,
    {
      method: "GET",
      headers: header,
    }
  );
  const response_object: ResultsDune = await response.json();
  return response_object;
};
