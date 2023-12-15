import { CSSProperties } from "react";
import "./App.css";
import Todos from "./components/Todos";
import { Button, Card, FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./state/store";
import { setView } from "./state/view/viewSlice";
import { EditForm } from "./components/EditForm";

function App() {
  const view = useSelector((state: RootState) => state.views.currentView);
  const editing = useSelector((state: RootState) => state.editing.editing);
  const editItemId = useSelector(
    (state: RootState) => state.editing.editItemId
  );

  const dispatch = useDispatch<AppDispatch>();
  const cardTitleStyle: CSSProperties = {
    textAlign: "left",
  };
  return (
    <div className="App">
      <>
        <Card
          title="Todo List"
          headStyle={cardTitleStyle}
          extra={
            <Button
              onClick={() => {
                if (view == "todos") {
                  dispatch(setView("deleted-todos"));
                } else {
                  dispatch(setView("todos"));
                }
              }}>
              {view == "todos" ? "Trash" : "See Todos"}
            </Button>
          }>
          {view == "todos" && <Todos></Todos>}
          {view == "add" && <EditForm></EditForm>}
          {view == "edit" && editing && editItemId !== null && (
            <EditForm todoId={editItemId}></EditForm>
          )}
          {view == "deleted-todos" && <Todos showDeletedItems={true}></Todos>}
        </Card>
        <FloatButton
          icon={<PlusOutlined />}
          type="primary"
          style={{ right: 24 }}
          onClick={() => dispatch(setView("add"))}
        />
      </>
    </div>
  );
}

export default App;
