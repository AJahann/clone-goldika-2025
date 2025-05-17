"use client";

import FaContent from "@/content/fa.json";
import MenuIcon from "@mui/icons-material/Menu";
import {
  alpha,
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const AuthButton = () => {
  return (
    <Link passHref href="/login">
      <Button
        variant="outlined"
        color="primary"
        sx={{
          borderRadius: "10px",
          height: "27.6px",
          padding: "3px 9px",
        }}
      >
        {FaContent.home.login_sign_up}
      </Button>
    </Link>
  );
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const theme = useTheme();

  return (
    <Drawer
      anchor="top"
      onClose={onClose}
      open={isOpen}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: theme.palette.background.paper,
          alignItems: "center",
          gap: 1,
          padding: 1.5,
        },
      }}
    >
      <AuthButton />
      <Stack sx={{ alignItems: "center" }}>
        {["blog", "about", "faq", "contact"].map((path) => (
          <Link
            passHref
            href={`/${path}`}
            key={path}
            style={{ textDecoration: "none" }}
          >
            <Typography
              sx={{
                "padding": "12px 5px",
                "color": theme.palette.text.primary,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {path === "blog" && FaContent.home.blog}
              {path === "about" && FaContent.home.about}
              {path === "faq" && FaContent.home.faq}
              {path === "contact" && FaContent.home.contact}
            </Typography>
          </Link>
        ))}
      </Stack>
    </Drawer>
  );
};

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (!isMobile && mobileOpen) {
      setMobileOpen(false);
    }
  }, [isMobile, mobileOpen]);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: `linear-gradient(180deg,${alpha(theme.palette.background.default, 1)} 90%, ${alpha(theme.palette.background.default, 0.1)} 100%)`,
        boxShadow: "none",
        minHeight: "68px",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: "68rem",
          margin: "0 auto",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Stack alignItems="center" gap="8px" direction="row">
          <IconButton
            aria-label="menu"
            edge="start"
            sx={{ display: { md: "none" }, color: theme.palette.common.white }}
            color="inherit"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          <Link passHref href="/">
            <Image
              height={40}
              width={40}
              alt="Goldika"
              src="/favicon.ico"
              style={{ marginLeft: "1.5rem" }}
            />
          </Link>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {["blog", "about", "faq", "contact"].map((path) => (
              <Link
                passHref
                href={`/${path}`}
                key={path}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  fontSize={14.4}
                  sx={{
                    "padding": "5px",
                    "color": theme.palette.text.primary,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {path === "blog" && FaContent.home.blog}
                  {path === "about" && FaContent.home.about}
                  {path === "faq" && FaContent.home.faq}
                  {path === "contact" && FaContent.home.contact}
                </Typography>
              </Link>
            ))}
          </Box>
        </Stack>

        <Box>
          <AuthButton />
        </Box>
      </Toolbar>

      <MobileMenu isOpen={mobileOpen} onClose={handleDrawerToggle} />
    </AppBar>
  );
};

export default NavBar;
