import * as Yup from "yup";
export const TodoSchema = Yup.object().shape({
  title: Yup.string().required("Title is required."),
  description: Yup.string().nullable(),
  deadline: Yup.date()
    .nullable()
    .test("is-future", "Date should be in the future", (val: any) => {
      const currentDate = new Date();
      return val === null || val > currentDate;
    }),
});
