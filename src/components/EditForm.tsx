import { Button, Col, DatePicker, Flex, Form, Input, Row } from "antd";
import { useFormik } from "formik";
import { TodoSchema } from "../Validations/TodoValidation";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { Status, addTodo } from "../state/todos/todosSlice";
import { setView } from "../state/view/viewSlice";
import dayjs from "dayjs";

interface Props {
  todoId?: number;
}

export function EditForm({ todoId = -1 }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  let todo = useSelector((state: RootState) => state.todos.todos).find(
    (todo) => todo.id == todoId
  );
  todo = todo || {
    title: "",
    description: "",
    status: Status.Pending,
  };
  const formik = useFormik({
    initialValues: {
      title: todo.title,
      description: todo.description,
      deadline: (todo.deadline && dayjs(todo.deadline)) || null,
    },

    validationSchema: TodoSchema,
    onSubmit(values) {
      dispatch(
        addTodo({
          title: values.title,
          description: values.description,
          status: Status.Pending,
          deadline: (values.deadline && values.deadline.toISOString()) || "",
        })
      );
      dispatch(setView("todos"));
    },
  });

  return (
    <Flex justify={"center"} align="center">
      <Row>
        <Col xs={24}>
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={(val) => formik.handleSubmit(val)}
            layout="horizontal">
            <Form.Item
              label="Title*"
              validateStatus={formik.errors.title ? "error" : ""}
              help={formik.errors.title}>
              <Input
                size="large"
                name="title"
                onChange={(event) => {
                  formik.setFieldValue("title", event.target.value);
                }}
                value={formik.values.title || ""}
              />
            </Form.Item>
            <Form.Item label="Description">
              <TextArea
                size="large"
                name="description"
                onChange={(event) => {
                  formik.setFieldValue("description", event.target.value);
                }}
                value={formik.values.description || ""}
              />
            </Form.Item>
            <Form.Item
              label="Deadline"
              validateStatus={formik.errors.deadline ? "error" : ""}
              help={formik.errors.deadline}>
              <DatePicker
                style={{ width: "100%" }}
                size="large"
                name="deadline"
                onChange={(value) => {
                  formik.setFieldValue("deadline", value);
                }}
                value={
                  formik.values.deadline ? dayjs(formik.values.deadline) : null
                }
              />
            </Form.Item>
            <Button
              htmlType="submit"
              style={{ width: "50%" }}
              className="primary">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Flex>
  );
}
