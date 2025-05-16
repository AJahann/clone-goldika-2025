"use client";
import homeCharData from "@/data/chart-data";
import { Box, styled, Typography, useTheme } from "@mui/material";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const ChartWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2.25),
  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(3.75),
    padding: 0,
  },
}));

const ChartBox = styled("div")(({ theme }) => ({
  padding: theme.spacing(2.25),
  borderRadius: "16px",
  backgroundColor: theme.palette.background.paper,
  height: "100%",
  direction: "ltr",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2.25, 0),
  },
}));

const ChartTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  lineHeight: "24px",
  color: theme.palette.common.white,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
  },
}));

const StyledResponsiveContainer = styled(ResponsiveContainer)(({ theme }) => ({
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const chartStyles = {
  axis: {
    line: { display: "none" },
    tickLine: { display: "none" },
  },
  tooltip: {
    wrapper: { display: "none" },
  },
};

const Chart = () => {
  const theme = useTheme();

  return (
    <Box>
      <ChartWrapper>
        <ChartBox>
          <ChartTitle variant="h2">
            نمودار نوسانات قیمت هر گرم طلای ۱۸ عیار
          </ChartTitle>
          <StyledResponsiveContainer height={400} width="100%">
            <AreaChart
              data={homeCharData}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#f1ab1fba" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                axisLine={chartStyles.axis.line}
                dataKey="ماه"
                tickLine={chartStyles.axis.tickLine}
              />
              <YAxis
                hide
                axisLine={chartStyles.axis.line}
                tickLine={chartStyles.axis.tickLine}
                domain={[3, 4]}
              />
              <Area
                dataKey="میانگین"
                fill="url(#colorUv)"
                fillOpacity={1}
                type="linear"
                stroke={theme.palette.primary.main}
                strokeWidth={3}
              />
            </AreaChart>
          </StyledResponsiveContainer>
        </ChartBox>
      </ChartWrapper>
    </Box>
  );
};

export default Chart;
