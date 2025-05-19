import { Box, CardContent, Icon, Stack, styled } from "@mui/material";

const InfoWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    margin: "0 auto",
    maxWidth: "480px",
    alignItems: "center",
    marginTop: theme.spacing(2),
    gap: 0,
    flexDirection: "column",
  },
}));

const InfoColumn = styled(Stack)(() => ({
  flex: 1,
}));

const InfoTextContainer = styled(Box)(({ theme }) => ({
  "& h1": {
    fontSize: "30px",
    lineHeight: "36px",
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.white,
    margin: theme.spacing(1, 0),
    [theme.breakpoints.down("md")]: {
      fontSize: "22px",
      textAlign: "center",
    },
  },
  "& p": {
    fontSize: "16px",
    lineHeight: "24px",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(1.5),
    textAlign: "justify",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
}));

const CardMediaContainer = styled(Icon)(() => ({
  height: "187px",
  maxWidth: "298px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  "padding": 0,
  "& .MuiTypography-root": {
    color: theme.palette.text.primary,
    margin: theme.spacing(1.75, 0),
    lineHeight: "34px",
  },
}));

const StyledCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "16px",
  padding: theme.spacing(3.375),
  margin: theme.spacing(1.5, 0),
}));

export {
  CardMediaContainer,
  InfoColumn,
  InfoTextContainer,
  InfoWrapper,
  StyledCard,
  StyledCardContent,
};
