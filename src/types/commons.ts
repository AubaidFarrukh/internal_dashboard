export type TCursor = string | null;
export type TPageSize = number;
export type TPage = number;
export type TBefore = number | null;
export type TAfter = number | null;

export type TTextField<TextFieldId extends string> = {
  id: TextFieldId;
  name: string;
  required: boolean;
  value: string;
  onChange: (value: string) => void;
  error: string | null;
  checkValidity: (value: string) => string;
  updateError: (value: string) => void;
};
