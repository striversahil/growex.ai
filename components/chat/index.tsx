import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChatWindow from "./window";

type Props = {};

const ChatInterface = (props: Props) => {
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
          <div className="flex-1 overflow-y-auto"></div>
          <ChatWindow />
          <form
            className="space-y-4 px-2 py-2"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target.query.value);
            }}
          >
            <Input
              id="query"
              placeholder="Type your question here..."
              className=" w-full rounded-3xl "
            />
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ChatInterface;
