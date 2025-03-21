import { ValidFunctionType } from "@/mk/utils/validate/Rules";

const formatDate = (date: Date) =>
  `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

export const validBetweenDate: ValidFunctionType = (value, param) => {
  const [start, end] = param.map((date) => new Date(date));
  start.setHours(start.getHours() + 4);
  end.setHours(end.getHours() + 4);

  // const formatDate = (date: Date) =>
  //   `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  return new Date(value) < start || new Date(value) > end
    ? `Debe estar entre ${formatDate(start)} y ${formatDate(end)}`
    : "";
};

// export const validDateGreaterNow: ValidFunctionType = (value, param) => {
//   let date = new Date(value);
//   let hoy = new Date();
//   date.setHours(date.getHours() + 4);
//   hoy.setHours(hoy.getHours() + 4);
//   date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
//   hoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

//   return date >= hoy ? "" : "La fecha no debe ser menor a hoy";
// };

export const validDateGreater: ValidFunctionType = (
  value,
  param,
  field = {}
) => {
  let date = new Date(value);
  let hoy = new Date();
  if (param && param[0]) {
    hoy = new Date(field ? field[param[0]] : "");
  }
  date.setHours(date.getHours() + 4);
  hoy.setHours(hoy.getHours() + 4);
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  hoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  return date >= hoy ? "" : "La fecha no debe ser menor a " + formatDate(hoy);
};

export const validDateLess: ValidFunctionType = (value, param, field = {}) => {
  let date = new Date(value);
  let hoy = new Date();
  if (param && param[0]) {
    hoy = new Date(field ? field[param[0]] : "");
  }

  date.setHours(date.getHours() + 4);
  hoy.setHours(hoy.getHours() + 4);
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  hoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  return date <= hoy ? "" : "La fecha no debe ser mayor a" + formatDate(hoy);
};

export const validPassword: ValidFunctionType = (value, param) => {
  let [min, max]: any = param;
  if (!min) min = 4;
  if (!max) max = 10;
  const error =
    "La contraseña debe tener entre " + min + " y " + max + " caracteres";
  return value.length < min || value.length > max ? error : "";
};

export const validCi: ValidFunctionType = (value, param) => {
  let [min, max]: any = param;
  if (!min) min = 5;
  if (!max) max = 10;
  const error = "El CI debe tener entre " + min + " y " + max + " numeros";
  return value.length < min || value.length > max || isNaN(value) ? error : "";
};

export const validOptionsSurvey: ValidFunctionType = (value, param, field) => {
  let error: string = "";
  const min = field?.nresp || 2;
  if (value.length <= min) return "Debe tener más de " + min + " opciones";

  value.forEach((option: any) => {
    if (!option.name) error = "Todas las opciones deben tener un valor";
  });
  return error;
};
