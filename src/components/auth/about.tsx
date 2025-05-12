"use client";
import FaContent from "@/content/fa.json";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Link from "next/link";

import FlowerSVG from "./flower-svg";
import Logo from "./logo";

const About = () => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        "position": "relative",
        "flex": { xs: 0, md: 1 },
        "height": "100%",
        "padding": { xs: "12px", md: "45px 16px" },
        "alignItems": "center",
        "justifyContent": "center",
        "minWidth": { xs: "auto", md: "360px" },
        "gap": "42px",
        "background": theme.palette.background.secondary,
        ".MuiTypography-root": {
          color: theme.palette.text.body,
        },
      }}
    >
      <Box
        href="/"
        component={Link}
        sx={{
          width: { xs: "80px", md: "125px" },
        }}
      >
        <Logo />
      </Box>

      <Stack
        alignItems="center"
        gap={4}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <Typography
          sx={{ maxWidth: "240px", textAlign: "justify" }}
          variant="body1"
        >
          {FaContent.auth.about.description}
        </Typography>

        <Stack
          alignItems="center"
          gap={1}
          sx={{ ".MuiTypography-root": { lineHeight: "16px" } }}
        >
          <Typography>{FaContent.auth.about.support}:</Typography>
          <Typography>{FaContent.auth.about.call_number}</Typography>
          <Typography>{FaContent.auth.about.email_contact}</Typography>
        </Stack>
      </Stack>

      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <FlowerSVG />
      </Box>
    </Stack>
  );
};

export default About;
