export interface SDIState {
  fase: number;
  prof: string;
  disc: string;
  q: string;
  n: number;
  dur: [number, number, number];
  sizes: number[];
  grupos: number[][];
  clusters: number[][];
  start: number | null;
  end: number | null;
  sintese: string;
}

export interface SDIProps {
  sdiState: SDIState;
  setSdiState: (state: SDIState) => void;
}

export interface LeadersPhaseProps extends SDIProps {
  isActive?: boolean;
}

export const initialSDIState: SDIState = {
  fase: 0,
  prof: "",
  disc: "",
  q: "",
  n: 25,
  dur: [300, 600, 480],
  sizes: [],
  grupos: [],
  clusters: [],
  start: null,
  end: null,
  sintese: ""
}; 