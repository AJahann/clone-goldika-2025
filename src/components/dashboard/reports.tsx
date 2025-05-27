"use client";
import { Box, Button, Stack, styled, Typography } from "@mui/material";

const ReportContainer = styled(Box)(() => ({
  maxWidth: "30rem",
  margin: "0 auto",
  width: "100%",
}));

const ReportHeader = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const ReportTitle = styled(Typography)(({ theme }) => ({
  lineHeight: "normal",
  margin: theme.spacing(1.5, 0),
  fontSize: "2.5rem",
  color: theme.palette.text.primary,
}));

const FilterButton = styled(Button)(({ theme }) => ({
  "backgroundColor": theme.palette.grey[600],
  "borderRadius": "8px",
  "fontWeight": "bold",
  "lineHeight": "normal",
  "height": "fit-content",
  "&.Mui-disabled": {
    backgroundColor: theme.palette.grey[600],
    color: theme.palette.text.disabled,
  },
}));

const EmptyState = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  fontSize: "1.5rem",
  color: theme.palette.grey[600],
  textAlign: "center",
}));

const Reports = () => {
  return (
    <ReportContainer>
      <ReportHeader>
        <ReportTitle variant="h1">گزارش</ReportTitle>
        <FilterButton disabled variant="contained">
          فیلتر ها
        </FilterButton>
      </ReportHeader>

      <EmptyState>هیچ گزارشی یافت نشد.</EmptyState>
    </ReportContainer>
  );
};

export default Reports;
