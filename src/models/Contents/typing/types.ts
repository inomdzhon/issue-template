export type ListType = {
  label?: string;

};

export type ContentHeaderType = {
  type: 'header';
  data: string;
  required?: boolean;
};

export type ContentListType = {
  type: 'list';
  data: '';
  required?: boolean;
};

export type ContentType = ContentHeaderType | ContentListType;

export type ContentsType = ContentType[];
