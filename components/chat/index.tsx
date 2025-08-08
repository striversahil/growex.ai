import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {};

const ChatInterface = (props: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="bg-indigo-400 rounded-full">
          AI Agent
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" bg-white/10 border border-white/15 w-100 h-200 p-4 rounded-3xl">
        <div className="absolute inset-2 bg-background rounded-3xl">
          <div className="space-y-4">
            <Label htmlFor="query">Ask your question</Label>
            <Input id="query" placeholder="Type your question here..." />
            <Button type="submit" className="w-full bg-blue-500 text-white">
              Send
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ChatInterface;
