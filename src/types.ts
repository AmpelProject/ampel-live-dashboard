export interface EventSummary {
  count: number;
  successes: number;
  failures: number;
  process: string;
  tier: number;
}

export interface TokenPayload {
  exp: Number;
  name: String;
  orgs: Array<String>;
  teams: Array<String>;
}

export interface TroubleDoc {
  exception: Array<string>;
  _exc_content?: { error: string; message: string };
}
