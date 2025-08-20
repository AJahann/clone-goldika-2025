"use client";
import FaContent from "@/content/fa.json";
import { Box, Stack, styled, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import Link from "next/link";

const ArticleWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(0, 6),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(0, 3),
  },
}));

const ArticleGrid = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(3),
  justifyContent: "space-around",
  flexDirection: "row-reverse",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const ArticleCardContainer = styled(Card)(({ theme }) => ({
  "borderRadius": "16px",
  "backgroundColor": theme.palette.background.paper,
  "transition": "transform 0.3s ease",
  "padding": "20px 10px",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: `0 4px 20px 0 ${theme.palette.primary.main}33`,
  },
  "flex": 1,
}));

const ArticleLink = styled(Link)(({ theme }) => ({
  "color": theme.palette.common.white,
  "display": "flex",
  "gap": "20px",
  "flexDirection": "column",
  "alignItems": "center",
  "textDecoration": "none",
  "height": "100%",
  "&:hover": {
    textDecoration: `${theme.palette.primary.main} underline`,
  },
}));

const ArticleImageContainer = styled(Box)(() => ({
  width: "100%",
  position: "relative",
  borderRadius: "16px",
  height: "17rem",
  overflow: "hidden",
}));

const ArticleTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  lineHeight: "1.5rem",
  textAlign: "center",
  padding: theme.spacing(0, 1),
}));

interface ArticleCardProps {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
}

const ArticleCard = ({ href, imageSrc, imageAlt, title }: ArticleCardProps) => (
  <ArticleCardContainer>
    <CardContent sx={{ p: 0, height: "100%" }}>
      <ArticleLink href={href}>
        <ArticleImageContainer>
          <Image
            fill
            // height={280}
            // width={300}
            sizes="300px 280px"
            alt={imageAlt}
            quality={100}
            src={imageSrc}
            style={{ objectFit: "cover" }}
            priority
          />
        </ArticleImageContainer>
        <ArticleTitle variant="h3">{title}</ArticleTitle>
      </ArticleLink>
    </CardContent>
  </ArticleCardContainer>
);

const Articles = () => {
  return (
    <Box>
      <ArticleWrapper>
        <Typography
          lineHeight="2rem"
          textAlign="center"
          variant="h2"
          color="textPrimary"
          fontWeight={500}
        >
          {FaContent.home.articles.title}
        </Typography>

        <ArticleGrid>
          {FaContent.home.articles.list.map((article) => (
            <ArticleCard
              href={article.href}
              imageAlt={article.imageAlt}
              imageSrc={article.imageSrc}
              key={article.id}
              title={article.title}
            />
          ))}
        </ArticleGrid>
      </ArticleWrapper>
    </Box>
  );
};

export default Articles;
