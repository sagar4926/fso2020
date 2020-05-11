// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isString = (str: any): str is string => {
  return typeof str === "string" || str instanceof String;
};
