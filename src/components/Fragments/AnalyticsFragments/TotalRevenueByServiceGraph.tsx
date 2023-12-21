import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Cell,
} from "recharts";
import UserService from "../../../services/user.service";
import { notifications } from "@mantine/notifications";
import { Center, Loader } from "@mantine/core";

export default function TotalRevenueByServiceGraph() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "brown", "pink"];

  useEffect(() => {
    UserService.getTotalRevenueByService().then(
      (response) => {
        setChartData(response.data.data);
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
          <ComposedChart data={chartData}>
            <XAxis
              tick={false}
              padding={{ left: 10, right: 10 }}
              dataKey="serviceName"
            />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [`${value}`, "Total Revenue"]}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              label="Total Revenue"
              dataKey="totalRevenue"
              barSize={20}
              fill="#ff7300"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="totalRevenue"
              strokeDasharray="5 5"
              stroke="#ff7300"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
