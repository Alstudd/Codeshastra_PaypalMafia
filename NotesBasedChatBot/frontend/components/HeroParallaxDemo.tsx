"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "Questify",
    link: "https://questify-ai.vercel.app",
    thumbnail:
      "https://devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fd918ed41893d49d3975dcfb56c91207d%2Fprojects%2F8f45173fa096435b9fce4a439d1401df%2Fb5e5141d-f32f-46a7-b7c0-4efc72078629.png&w=1440&q=75",
  },
  {
    title: "Tree Tally",
    link: "https://tree-tally.vercel.app",
    thumbnail:
      "/treetally-web.png",
  },
  {
    title: "Optipick",
    link: "/",
    thumbnail:
      "/optipick-web.png",
  },

  {
    title: "Alphamatics",
    link: "https://alphamatics.in",
    thumbnail:
      "/alphamatics-web.png",
  },
  {
    title: "Not Used",
    link: "/",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Polydine",
    link: "/",
    thumbnail:
      "https://tietans.tech/img/polydine.jpeg",
  },

  {
    title: "Public Square",
    link: "/",
    thumbnail:
      "/publicsquare-web.png",
  },
  {
    title: "CertSecure",
    link: "/",
    thumbnail:
      "https://assets.devfolio.co/hackathons/edb2de3dddac4e138dbccad4dbe629dc/projects/290a7eb9ae4e42518dc3fc6e107f24e2/177ef435-3fc7-4e54-b96a-70b9f9206318.jpeg",
  },
  {
    title: "Credence",
    link: "https://credencee.vercel.app/",
    thumbnail:
      "https://assets.devfolio.co/hackathons/870790376a9544d888f76cd3c3dfd667/projects/24c7bcc6ed1e403e8fa825aef559287c/d1d6a0ed-c84c-4b68-8b72-5fa1effd99e0.jpeg",
  },
  {
    title: "Not Used",
    link: "/",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Not Used",
    link: "/",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },

  {
    title: "Tech Tietans",
    link: "https://tietans.tech/",
    thumbnail:
      "/tietans-web.png",
  },
  {
    title: "Sarthaki",
    link: "https://sarthaki-v1-0.vercel.app",
    thumbnail:
      "/sarthaki-web.png",
  },
  {
    title: "Legally Yours",
    link: "https://legallyyours.co.in",
    thumbnail:
      "/legallyyours-web.png",
  },
  {
    title: "GDSC CRCE",
    link: "https://gdsc-crce.vercel.app/",
    thumbnail:
      "/gdsc-web.png",
  },
];
