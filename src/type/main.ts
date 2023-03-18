export enum Channels {
  IPC_EXAMPLE = 'ipc-example',
  FILE = 'file',
}

export interface FileArgument {
  type: FileType;
}

export enum FileType {
  PDF = 'PDF',
}

export enum TaskResult {
  SUCCESS = 'success',
  FAIL = 'fail',
}

export interface FileReply {
  message: TaskResult;
  data: Buffer;
}
