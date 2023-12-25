// utilities/classNames.ts

type ClassNamesArg = string | Record<string, boolean | undefined> | null | undefined | false;

const classNames = (...args: ClassNamesArg[]): string => {
  return args
    .filter((arg): arg is string | Record<string, boolean> => !!arg)
    .map((arg) => {
      if (typeof arg === 'string') {
        return arg;
      } else {
        return Object.entries(arg)
          .filter(([_, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
    })
    .join(' ');
};

export default classNames;
