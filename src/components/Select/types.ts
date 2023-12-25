interface Option {
    value: string;
    label: string;
  }

export interface ISelectProps<T = string> {
    options: Option[];
    onSelect: (value: T) => void;
    className?: string;
}