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
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<Array<any>>([
    {
      role: "system",
      content:
        "{'output': { 'format': 'markdown', 'max_tokens': 1000, 'overflow_strategy': 'fold'}}",
    },
  ]);

  const submitMessage = async () => {
    let messages = [...chat];
    messages.push(
      {
        role: "user",
        content: message,
      },
      {
        role: "loading",
        content: message,
      }
    );
    setMessage("");
    setChat(messages);
    setIsLoading(true);
    await axios
      .post("/api/gpt", {
        messages: messages.filter(({ role }) => role !== "loading"),
      })
      .then((res: any) => {
        messages.push(res.data?.result);
        setIsLoading(false);
        setChat(messages.filter(({ role }) => role !== "loading"));
      });
  };

  return (
    <>
      {/* <div className="grow px-10 py-20 overflow-y-auto scroll-smooth scrollbar-none 2xl:py-12 md:px-4 md:pt-0 md:pb-6">
        <div className="mb-10 text-center">
          <div className="h3 leading-[4rem] 2xl:mb-2 2xl:h4">
            Unlock the power of AI
          </div>
          <div className="body1 text-n-4 2xl:body1S">
            Chat with the smartest AI - Experience the power of AI with us
          </div>
        </div>
        <Menu className="max-w-[30.75rem] mx-auto" items={navigation} />
      </div> */}
      <Chat title="Your AI assistant">
        {chat.map((item, index) => {
          const { role, content } = item;
          return role === "user" ? (
            <>
              <Question
                key={index}
                content={content}
                time={new Date().toDateString()}
              />
            </>
          ) : (
            <>
              {role === "loading" ? (
                <Answer loading />
              ) : role === "system" ? null : (
                <Answer key={index}>
                  {
                    <ReactMarkdown
                      children={content}
                      remarkPlugins={[remarkGfm]}
                    />
                  }
                </Answer>
              )}
            </>
          );
        })}
      </Chat>
      <Message
        value={message}
        onChange={(e: any) => setMessage(e.target.value)}
        onSubmit={submitMessage}
      />
    </>
  );
};

export default Main;
