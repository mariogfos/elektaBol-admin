import {
  validBetweenDate,
  validPassword,
  validCi,
  validOptionsSurvey,
} from "./rulesApp";

export const validators = {
  betweenDate: validBetweenDate,
  password: validPassword,
  ci: validCi,
  optionSurvey: validOptionsSurvey,
  // Añadir otros validadores aquí
};
