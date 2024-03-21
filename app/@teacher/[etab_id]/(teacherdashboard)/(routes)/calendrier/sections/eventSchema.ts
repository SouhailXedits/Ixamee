import * as Yup from 'yup';

const useValidationsCategorySchema = () => {
  const validationsCategorySchema = Yup.object().shape({
    title: Yup.string()
      .max(100, 'Vous ne pouvez pas transmettre plus de 100 caractères')
      .required('Le nom est requis'),
    start: Yup.date().required('La date de début est requise'),
    end: Yup.date().required('La date de fin est requise'),
    color: Yup.object().required('La couleur est obligatoire'),
    classes: Yup.array().of(Yup.string()).required('Au moins une classe est requise').min(1, 'Une classe est requise'),
    subject: Yup.object().required('La matière est obligatoire'),
    description: Yup.string(),
    studentsVisibility: Yup.boolean().required(),
    establishment: Yup.string(),
  });

  return validationsCategorySchema;
};

export default useValidationsCategorySchema;
