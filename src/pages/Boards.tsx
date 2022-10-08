import { Card, Col, Row, Typography } from "antd";
import { BarChartOutlined, PlusCircleFilled } from "@ant-design/icons";
const { Title, Text } = Typography;

const Boards = () => {
  return (
    <div className="bg-gray-100 w-full h-screen">
      <Col className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Row className="mb-16">
          <Title level={2} className="font-bold text-4xl">
            Scrumboard App
          </Title>
        </Row>
        <Row className="flex justify-center ">
          <Card className="bg-white w-32 h-32 mr-10 rounded-md">
            <BarChartOutlined className="w-full text-gray-500 text-3xl mb-5 mt-2" />
            <Text className="text-gray-500">ACME Frontend Application</Text>
          </Card>
          <Card className="bg-white w-32 h-32 mr-10 rounded-md ">
            <BarChartOutlined className="w-full text-gray-500 text-3xl mb-5 mt-2" />
            <Text className="text-gray-500">ACME Backend Application</Text>
          </Card>
          <Card className="bg-white w-32 h-32 rounded-md">
            <PlusCircleFilled className="w-full text-cyan-400 text-3xl mb-5 mt-2" />
            <Text className="text-gray-500">Add New Board</Text>
          </Card>
        </Row>
      </Col>
    </div>
  );
};

export default Boards;
