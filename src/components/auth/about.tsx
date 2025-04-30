"use client";
import FaContent from "@/content/fa.json";
import { Stack, Typography, useTheme } from "@mui/material";

const About = () => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        flex: 1,
        height: "100%",
        padding: "45px 16px",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        background: theme.palette.background.secondary,
      }}
    >
      <div>logo</div>

      <Typography sx={{ maxWidth: "300px" }} variant="body1">
        {FaContent.auth.about.description}
      </Typography>
    </Stack>
  );
};

export default About;
