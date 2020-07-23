import { createContext } from 'react';

interface ApiResponse {
  title: string;
  creatable: boolean;
  cards: ApiResponseCard[];
  done: boolean;
}

interface ApiResponseCard {
  id: number;
  content: string;
  labels: string[];
  user?: string;
}

interface ContextData {
  lists: ApiResponse[];
  move(
    draggedListIndex: number,
    targetListIndex: number,
    from: number,
    to: number,
  ): void;
}

export default createContext<ContextData>({} as ContextData);
