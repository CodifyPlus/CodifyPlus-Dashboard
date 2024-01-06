import { Container } from "@mantine/core";
import React from "react";
import { FeaturesSection } from "../Fragments/ServicesFragments/FeaturesSection";

const featuredData = {
  supTitle: "Services",
  description:
    "Are you looking for a lawyer to get your business registration done? Or a developer for your startup's website? Or want to get your work patented? Here are some of the services we offer",
  data: [
    {
      image: "https://ui.mantine.dev/_next/static/media/auditors.32124e83.svg",
      title: "One Person Company",
      description:
        "Every Start-Up deserves seamless, trusted & hassle-free Legal Services",
      link: "https://startupkro.com/op/",
    },
    {
      image: "https://ui.mantine.dev/_next/static/media/lawyers.3ddb0c33.svg",
      title: "Sole Proprietorship",
      description:
        "Say goodbye to legal complexities with CodifyPlus's tax and compliance services",
      link: "https://startupkro.com/sole-proprietorship-registration/",
    },
    {
      image:
        "https://ui.mantine.dev/_next/static/media/accountants.ba1b4633.svg",
      title: "Limited Liability Partnership",
      description:
        "Protect your brand with CodifyPlus's trademark and IP services",
      link: "https://startupkro.com/limited-liability-partnership-llp/",
    },
    {
      image: "https://ui.mantine.dev/_next/static/media/others.0a9c7795.svg",
      title: "Documentation",
      description:
        "Say goodbye to paperwork with CodifyPlus's documentation services",
      link: "web-development",
    },
    {
      image: "https://ui.mantine.dev/_next/static/media/auditors.32124e83.svg",
      title: "Fundraising",
      description:
        "Get your business funded with CodifyPlus's fundraising solutions",
      link: "web-development",
    },
    {
      image: "https://ui.mantine.dev/_next/static/media/lawyers.3ddb0c33.svg",
      title: "NGO",
      description:
        "Realize your social vision with CodifyPlus's expert guidance",
      link: "web-development",
    },
    {
      image:
        "https://ui.mantine.dev/_next/static/media/accountants.ba1b4633.svg",
      title: "Property & Personal",
      description:
        "Secure your property and personal interests with CodifyPlus's services",
      link: "web-development",
    },
    {
      image: "https://ui.mantine.dev/_next/static/media/others.0a9c7795.svg",
      title: "Web Development",
      description:
        "Get a stunning website that meets all your business needs with CodifyPlus",
      link: "web-development",
    },
    {
      image:
        "https://ui.mantine.dev/_next/static/media/accountants.ba1b4633.svg",
      title: "Digital Marketing",
      description:
        "Get ahead of your competition with CodifyPlus's expert guidance",
      link: "web-development",
    },
    {
      image: "https://ui.mantine.dev/_next/static/media/others.0a9c7795.svg",
      title: "Graphic and Branding",
      description: "Get visually appealing branding solutions with CodifyPlus",
      link: "web-development",
    },
    {
      image: "https://ui.mantine.dev/_next/static/media/auditors.32124e83.svg",
      title: "On-Demand Services",
      description:
        "We offer on-demand services also. Drop us a message to know more.",
      link: "web-development",
    },
  ],
};

function Services() {
  return (
    <Container my="md" size="auto">
      <FeaturesSection {...featuredData} />
    </Container>
  );
}

export default Services;
