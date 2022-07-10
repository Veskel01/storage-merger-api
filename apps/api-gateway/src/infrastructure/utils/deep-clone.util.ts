export function deepCloneObject<T extends object = object>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T;
}
