import React, { useEffect, useState } from "react";
import { ResponsiveContainer, Cell, PieChart, Pie, Tooltip } from "recharts";
import UserService from "../../../services/user.service";
import { notifications } from "@mantine/notifications";
import { Center, Loader } from "@mantine/core";

export default function ServicesSoldData() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "brown", "pink"];

  useEffect(() => {
    UserService.getServicesSoldData().then(
      (response) => {
        const dataWithId = response.data.data.map((entry, index) => ({
          name: entry.serviceName,
          value: entry.count,
          id: index,
        }));
        setChartData(dataWithId);
        setIsLoading(false);
      },
      (error) => {
        if (error) {
          notifications.show({
            title: "Error",
            message: error.message,
            color: "red",
          });
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <Center>
          <Loader variant="bars" />
        </Center>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              label
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => {
                return [`${value}`, name];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
