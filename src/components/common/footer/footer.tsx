"use client";
import FaContent from "@/content/fa.json";
import { Box } from "@mui/material";
import Image from "next/image";

import SocialGroupIcons from "./footer-social-icons";
import {
  AddressText,
  CopyrightText,
  FooterAddress,
  FooterConnect,
  FooterContainer,
  FooterInfo,
  FooterLink,
  FooterLinksColumn,
  FooterLinksContainer,
  FooterNemad,
  FooterNemadsContainer,
  FooterRow,
  FooterWrapper,
  PhoneText,
} from "./styled";

const FooterLinks = () => {
  return (
    <FooterLinksContainer>
      <FooterLinksColumn>
        {FaContent.footer.links.right.map((link) => (
          <FooterLink passHref href={link.href} key={link.href}>
            {link.label}
          </FooterLink>
        ))}
      </FooterLinksColumn>
      <FooterLinksColumn>
        {FaContent.footer.links.left.map((link) => (
          <FooterLink passHref href={link.href} key={link.href}>
            {link.label}
          </FooterLink>
        ))}
      </FooterLinksColumn>
    </FooterLinksContainer>
  );
};

const FooterNemads = () => {
  return (
    <FooterNemadsContainer>
      {FaContent.footer.nemads.map((nemad) => (
        <FooterNemad key={nemad.alt}>
          <Image
            height={80}
            width={80}
            alt={nemad.alt}
            src={nemad.src}
            style={{ objectFit: "contain" }}
          />
        </FooterNemad>
      ))}
    </FooterNemadsContainer>
  );
};

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterRow>
          <FooterLinks />
          <FooterNemads />
        </FooterRow>
        <FooterInfo>
          <FooterAddress>
            <AddressText>{FaContent.footer.addresses.technical}</AddressText>
            <AddressText>{FaContent.footer.addresses.store}</AddressText>
          </FooterAddress>
          <FooterConnect>
            <PhoneText>
              <span>{FaContent.footer.phone.label}</span>{" "}
              {FaContent.footer.phone.number}
            </PhoneText>
            <Box sx={{ marginTop: 1 }}>
              <SocialGroupIcons />
            </Box>
          </FooterConnect>
        </FooterInfo>
        <CopyrightText>{FaContent.footer.copyright}</CopyrightText>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
