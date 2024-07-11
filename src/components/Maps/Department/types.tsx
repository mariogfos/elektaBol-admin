

export type DepartmentsType = {
    department: any;
    onClickBack: () => void;
  };
export type DepartmentType = {
    circunscripcion: TooltipDataType;
    onClickBack?: () => void;
    handleCircunscripcion: (data: TooltipDataType) => void;
    selectedCircunscripcion: any;
  };  
  export type TooltipDataType = {
    id: number;
    titulo: string;
    data: any;
  };