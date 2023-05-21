import { useEffect, useState } from "react";
import Message from "@/components/Message";
import Menu from "@/components/Menu";

import { navigation } from "@/constants/navigation";
import axios from "axios";
import Chat from "@/components/Chat";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import Photo from "@/components/Photo";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MainProps = {};

const Main = ({}: MainProps) => {
  return (
    <>
      <div className="grow px-10 py-20 overflow-y-auto scroll-smooth scrollbar-none 2xl:py-12 md:px-4 md:pt-0 md:pb-6">
        <div className="mb-10 text-center">
          <div className="h3 leading-[4rem] 2xl:mb-2 2xl:h4">
            Unlock the power of AI
          </div>
          <div className="body1 text-n-4 2xl:body1S">
            Chat with the smartest AI - Experience the power of AI with us
          </div>
        </div>
        <Menu className="max-w-[30.75rem] mx-auto" items={navigation} />
      </div>
    </>
  );
};

export default Main;
