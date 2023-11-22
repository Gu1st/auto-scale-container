interface ignoreOptions {
  width: number;
  height: number;
  scale: number;
  fontSize: string;
  el: string;
}

export type ignoreList = string[] | ignoreOptions[];

export interface DefaultObjectOptions {
  designWidth: number;
  designHeight: number;
  container: string;
  resize: boolean;
  ignore: ignoreList;
  transition: string;
  delay: number;
}

export type DefaultOptions = string | DefaultObjectOptions;
