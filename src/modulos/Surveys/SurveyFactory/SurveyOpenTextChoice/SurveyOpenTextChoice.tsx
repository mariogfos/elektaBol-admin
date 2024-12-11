import Input from "@/mk/components/forms/Input/Input";
import DataModal from "@/mk/components/ui/DataModal/DataModal";
import React, { useState } from "react";
import styles from "./SurveyOpenTextChoice.module.css";
import Button from "@/mk/components/forms/Button/Button";
import { checkRules, hasErrors } from "@/mk/utils/validate/Rules";
import TextArea from "@/mk/components/forms/TextArea/TextArea";

const SurveyOpenTextChoice = ({
  formState,
  setFormState,
  setType,
  editingQuestion,
  editingIndex,
}: any) => {
  const [formStateSingleChoice, setFormStateSingleChoice]: any = useState(
    editingQuestion
      ? { ...editingQuestion }
      : {
          type: "T",
          name: "",
          description: "",
          order:
            editingIndex !== undefined
              ? editingIndex
              : formState?.questions?.length,
        }
  );

  const [errors, setErrors]: any = useState({});

  const handleChange = (e: any) => {
    let value = e.target.value;
    setFormStateSingleChoice({
      ...formStateSingleChoice,
      [e.target.name]: value,
    });
  };

  const validate = (field: any = "") => {
    let errors: any = {};

    errors = checkRules({
      value: formStateSingleChoice.name,
      rules: ["required"],
      key: "name",
      errors,
    });

    setErrors(errors);
    return errors;
  };

  const _onSave = () => {
    if (hasErrors(validate())) return;

    const updatedQuestion = {
      ...formStateSingleChoice,
      order:
        editingIndex !== undefined
          ? editingIndex
          : formState?.questions?.length,
    };

    if (editingIndex !== undefined && editingIndex !== null) {
      // Actualizar pregunta existente
      setFormState((prevFormState: any) => {
        const updatedQuestions = [...prevFormState.questions];
        updatedQuestions[editingIndex] = updatedQuestion;
        return {
          ...prevFormState,
          questions: updatedQuestions,
        };
      });
    } else {
      // Agregar nueva pregunta
      setFormState((prevFormState: any) => ({
        ...prevFormState,
        questions: [...(prevFormState.questions || []), updatedQuestion],
      }));
    }
    setType("");
  };

  return (
    <DataModal
      style={{ width: editingQuestion ? "100%" : "" }}
      open={true}
      onClose={() => setType("")}
      onSave={_onSave}
    >
      <div className={styles.surveyOpenTextChoice}>
        <p>Escuchamos tus necesidades</p>
        <p>Encuesta para mejorar la forma de vida en nuestro país</p>
        <p>• Opción de caja de texto</p>
        <div>
          <p>Pregunta</p>
          <Input
            type="text"
            value={formStateSingleChoice.name}
            onChange={handleChange}
            name="name"
            label="Escribe tu pregunta aquí"
            error={errors}
          />
        </div>
        <div>
          <p>Descripción (Opcional)</p>
          <Input
            type="text"
            value={formStateSingleChoice.description}
            onChange={handleChange}
            name="description"
            label="Escribe una descripción"
            error={errors.description}
          />
        </div>
        <div>
          <p>Vista previa</p>
          <TextArea
            value=""
            name="example"
            label="Escribe tu respuesta aquí"
            lines={5}
            disabled={true}
          />
        </div>
      </div>
    </DataModal>
  );
};

export default SurveyOpenTextChoice;
