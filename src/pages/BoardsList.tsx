import { Button, Layout, Row, Typography } from "antd";
import {
  BarChartOutlined,
  EyeOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { Text } = Typography;

const BoardsList = () => {
  return (
    <Layout>
      <Header className="bg-slate-900 h-20">
        <Row className="flex justify-between items-center mr-10 ml-10 pt-3">
        <Button className="bg-cyan-400 p-3 rounded-full">
          {" "}
          <BarChartOutlined /> Boards
        </Button>
        <Text className="text-white">
          <EyeOutlined /> Untitled Board
        </Text>
        <SettingOutlined className="text-white" />
        </Row>
     
      </Header>
    </Layout>
  );
};

export default BoardsList;
