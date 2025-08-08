import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChatWindow from "./window";
import { ChatActions } from "@/action";

type Props = {};

const ChatInterface = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending } = ChatActions.sendMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;

    mutate({ query: query });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPending]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="bg-indigo-400 rounded-full">
          AI Agent
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" bg-white/10 border border-white/15 w-100 h-[50vh] p-4 rounded-3xl">
        <div className="absolute flex flex-col inset-2 bg-background rounded-3xl">
          {/* A Window of Messages */}
          <div className="flex-1 overflow-y-auto p-2">
            <ChatWindow />
          </div>
          <form className="space-y-4 px-2 py-2" onSubmit={handleSubmit}>
            {isPending && (
              <div className="text-sm text-gray-500 mb-2">
                Submitting your query...
              </div>
            )}
            <Input
              name="query"
              placeholder="Type your question here..."
              className=" w-full rounded-3xl "
              disabled={isPending}
              ref={inputRef}
            />
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ChatInterface;
