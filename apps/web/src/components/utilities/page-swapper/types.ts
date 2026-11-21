export type SupportedFileKind = 'pdf' | 'image';

export interface LoadedDocState {
  file: File;
  name: string;
  size: number;
  kind: SupportedFileKind;
  arrayBuffer: ArrayBuffer;
  totalPages: number;
  currentPage: number;
}

export interface SwapExecutionPayload {
  sigBuffer: ArrayBuffer;
  sigKind: SupportedFileKind;
  sigPage: number;
  docBuffer: ArrayBuffer;
  docPage: number;
}

export interface SwapExecutionResult {
  pdfBytes: Uint8Array;
  totalPages: number;
  swappedTargetPage: number;
}
