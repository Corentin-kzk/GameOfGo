import * as Yup from "yup";

const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required("Le nom utilisateur est requis"),
  password: Yup.string().required("Le mot de passe est requis")
});

export default loginValidationSchema;
