import React from "react";
import { Button, Link, Text } from "@chakra-ui/react";
import GitHubIcon from "@mui/icons-material/GitHub";

export const Footer = () => {
  return (
    <div className="w-full flex gap-2 fixed left-0 bottom-0 px-8 p-2 sm:justify-center bg-slate-200">
      <Button leftIcon={<GitHubIcon />} variant="link">
        <Link
          href="https://github.com/maciejszaman/languageguessing"
          isExternal
        >
          Github
        </Link>
      </Button>
    </div>
  );
};
