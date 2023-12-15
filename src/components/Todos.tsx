import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { Button, Card, Col, Flex, Row, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { Typography } from "antd";
import { Status, deleteTodo } from "../state/todos/todosSlice";
import { format } from "date-fns";
import { MyCheckbox } from "./Checkbox";
import { setView } from "../state/view/viewSlice";
import { startEditing } from "../state/editing/editingSlice";
const { Text } = Typography;

const gridStyle: React.CSSProperties = {
  width: "100%",
  textAlign: "center",
};

interface Props {
  showDeletedItems?: boolean;
}

const Todos = ({ showDeletedItems = false }: Props) => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();

  const todosView = todos
    .filter(
      (todo) =>
        (todo.status != Status.Removed && !showDeletedItems) ||
        (todo.status === Status.Removed && showDeletedItems)
    )
    .map((todo) => {
      return (
        <Card.Grid style={gridStyle}>
          <Row align={"middle"}>
            <Col xs={24} sm={24} md={6}>
              <MyCheckbox todo={todo} />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Flex vertical justify="space-between" align="center">
                <Title level={5}>Title: {todo.title}</Title>
                <Text type="secondary">
                  Description: {todo.description || "Does not specified"}
                </Text>
                <Text>
                  Deadline:{" "}
                  {todo.deadline
                    ? format(new Date(todo.deadline), "dd/MM/yyyy")
                    : "Does not specified"}
                </Text>
              </Flex>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Space>
                {!showDeletedItems && (
                  <Button
                    type="primary"
                    shape="circle"
                    onClick={() => {
                      dispatch(startEditing(todo.id));
                      dispatch(setView("edit"));
                    }}
                    icon={<EditOutlined />}
                  />
                )}
                {!showDeletedItems && (
                  <Button
                    type="primary"
                    shape="circle"
                    onClick={() => {
                      dispatch(deleteTodo(todo));
                    }}
                    icon={<DeleteOutlined />}
                  />
                )}
              </Space>
            </Col>
          </Row>
        </Card.Grid>
      );
    });
  if (todosView.length == 0) {
    return <h3>You don't have any {showDeletedItems && "deleted "} todos.</h3>;
  }

  return <>{todosView}</>;
};

export default Todos;
