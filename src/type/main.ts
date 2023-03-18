export enum Channels {
  IPC_EXAMPLE = 'ipc-example',
  GET_FILE_DATA = 'get-file-data',
  GET_FILE_URL = 'get-file-url',
}

export interface GetFileUrlArgument {
  type: FileType;
}

export interface GetFileDataArgument {
  url: string;
}

export enum FileType {
  PDF = 'pdf',
}

export enum TargetType {
  URL = 'url',
  FILE = 'file',
}

export enum TaskResult {
  SUCCESS = 'success',
  FAIL = 'fail',
}

export interface GetFileDataResponse {
  message: TaskResult;
  data: Buffer;
}

export interface GetFileUrlResponse {
  message: TaskResult;
  data: {
    fileUrl: string;
    fileName: string;
  };
}
