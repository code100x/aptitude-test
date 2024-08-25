import React from "react";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-muted-foreground text-balance text-center text-sm leading-loose md:text-left">
          All rights reserved. ©
          <a
            href={"https://100xdevs.com/"}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            100xDev
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
