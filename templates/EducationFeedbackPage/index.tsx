import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Chat from "@/components/Chat";
import Message from "@/components/Message";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import Feedback from "@/components/Feedback";
import axios from "axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

const EducationFeedbackPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [regenerate, setRegenerate] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [lastMessage, setLastMessage] = useState<string>("");
  const [chat, setChat] = useState<Array<any>>([
    {
      role: "system",
      content:
        "{'output': { 'format': 'markdown', 'max_tokens': 1000, 'overflow_strategy': 'fold'}}",
    },
  ]);

  const submitMessage = async () => {
    let messages = [...chat];

    if (regenerate) {
      messages.push(
        {
          role: "user",
          content: lastMessage,
        },
        {
          role: "loading",
          content: lastMessage,
        }
      );
      setRegenerate(false);
    } else {
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
    }

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

  useEffect(() => {
    if (regenerate) {
      submitMessage();
    }
  }, [regenerate]);

  return (
    <Layout>
      <Chat title="Education Assistant">
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
                <Answer
                  key={index}
                  content={content}
                  onRegenerate={() => {
                    setRegenerate(true);
                  }}
                >
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
        onChange={(e: any) => {
          setMessage(e.target.value);
          setLastMessage(e.target.value);
        }}
        onSubmit={submitMessage}
      />
    </Layout>
  );
};

export default EducationFeedbackPage;
