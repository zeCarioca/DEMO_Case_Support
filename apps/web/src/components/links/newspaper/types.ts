import { PermResolutionResponse } from '@case-support/shared-types';

export interface NewspaperResolverState {
  zipInput: string;
  isLoading: boolean;
  error: string | null;
  resolution: PermResolutionResponse | null;
}
