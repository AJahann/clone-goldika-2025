"use client";
import FaContent from "@/content/fa.json";
import { Box, Link as MuiLink, Stack, Typography } from "@mui/material";
import Link from "next/link";

import FooterSocialIcons from "../common/footer/footer-social-icons";
import contactInfo from "./contact-data";
import ContactInfo from "./content-info";
import OperatorSVG from "./operator-svg";
import {
  ContactContent,
  ContactDetailsWrapper,
  ContactIcon,
  ContactMapWrapper,
  ContactTitle,
  ContactWrapper,
} from "./styled";

function ContactDetails() {
  return (
    <>
      <Typography mt={1} variant="h2">
        برای ارتباط با توسعه دهنده از طریق تلگرام:
        <MuiLink
          href="https://t.me/a_v101"
          target="_blank"
          underline="none"
          color="primary"
          component={Link}
        >
          t.m/A_v101
        </MuiLink>
      </Typography>

      <Typography variant="body1" color="error">
        این وبسایت یک کلون از سایت گلدیکا میباشد جهت مشاهده سایت اصلی:{" "}
        <MuiLink
          href="https://goldika.ir/"
          target="_blank"
          underline="none"
          color="primary"
          component={Link}
        >
          goldika.ir
        </MuiLink>
      </Typography>

      <Box>
        <OperatorSVG />
      </Box>
      <ContactDetailsWrapper>
        {contactInfo.map((item) => (
          <ContactInfo
            key={item.id}
            icon={<ContactIcon>{item.icon}</ContactIcon>}
          >
            {item.text}
          </ContactInfo>
        ))}

        <Stack alignItems="center" mt={2}>
          <FooterSocialIcons />
        </Stack>
      </ContactDetailsWrapper>
    </>
  );
}

function ContactMap() {
  return (
    <ContactMapWrapper>
      <iframe
        height="320"
        width="320"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.014406178425!2d51.3530723!3d35.7012631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0167eaeb16d7%3A0xebf245068e88e31e!2z2K_Zgdiq2LEg2YXYsdqp2LLbjCDar9mE2K_bjNqp2Kc!5e0!3m2!1sfa!2sse!4v1701671177035!5m2!1sfa!2sse&amp;language=fa"
        style={{ borderRadius: 16, backgroundColor: "#fff" }}
        title="map"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts"
      ></iframe>
    </ContactMapWrapper>
  );
}

export default function ContactPage() {
  return (
    <Box>
      <ContactWrapper>
        <ContactTitle variant="h1">{FaContent.contact.contact}</ContactTitle>
        <ContactContent>
          <ContactDetails />
          <ContactMap />
        </ContactContent>
      </ContactWrapper>
    </Box>
  );
}
