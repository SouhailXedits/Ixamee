import * as Yup from 'yup';

const useValidationsCategorySchema = () => {
  const validationsCategorySchema = Yup.object().shape({
    title: Yup.string()
      .max(100, 'tu ne peux pas transmettre 100 caractères')
      .required('Le nom est requis'),
    start: Yup.date().required('la date de début est requise'),
    end: Yup.date().required('la date de fin est requise'),
    color: Yup.object().required('la couleur est obligatoire'),
    classes: Yup.array().required('le classe est obligatoire').min(1, 'le classe est obligatoire'),
    subject: Yup.object().required('la matière est obligatoire'),
    description: Yup.string(),
    studentsVisibility: Yup.boolean().required(),
    establishment: Yup.string(),
  });

  return validationsCategorySchema;
};

export default useValidationsCategorySchema;
