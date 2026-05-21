"use client"

import { useState } from "react"
import { Send, Paperclip } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PageContainer } from "@/components/layout/page-container"
import { formatDate } from "@/lib/utils"

interface Message {
  id: string
  sender: string
  text: string
  time: Date
  isMe: boolean
}

interface Conversation {
  id: string
  name: string
  lastMessage: string
  avatar: string
  messages: Message[]
}

const initialConversations: Conversation[] = [
  {
    id: "1",
    name: "Kitchen Staff",
    lastMessage: "Order #24 is ready",
    avatar: "KS",
    messages: [
      { id: "m1", sender: "Kitchen Staff", text: "Order #24 is ready for pickup", time: new Date(Date.now() - 1000 * 60 * 5), isMe: false },
      { id: "m2", sender: "You", text: "Thanks, coming now", time: new Date(Date.now() - 1000 * 60 * 3), isMe: true },
      { id: "m3", sender: "Kitchen Staff", text: "Also need more Indomie supplies", time: new Date(Date.now() - 1000 * 60), isMe: false },
    ],
  },
  {
    id: "2",
    name: "Customer Support",
    avatar: "CS",
    lastMessage: "Customer asked about menu",
    messages: [
      { id: "m4", sender: "Customer Support", text: "Customer asked if we have vegetarian options", time: new Date(Date.now() - 1000 * 60 * 30), isMe: false },
      { id: "m5", sender: "You", text: "Yes, we have Tempe Goreng and Capcay", time: new Date(Date.now() - 1000 * 60 * 28), isMe: true },
    ],
  },
]

export default function AdminChat() {
  const [conversations] = useState(initialConversations)
  const [activeChat, setActiveChat] = useState(conversations[0].id)
  const [message, setMessage] = useState("")

  const chat = conversations.find((c) => c.id === activeChat) || conversations[0]

  function sendMessage() {
    if (!message.trim()) return
    setMessage("")
  }

  return (
    <PageContainer pageTitle="Chat" pageDescription="Internal messaging system.">
      <div className="grid h-[600px] grid-cols-1 gap-4 md:grid-cols-[280px_1fr]">
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Conversations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 p-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveChat(conv.id)}
                className={`flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm transition-colors ${
                  activeChat === conv.id ? "bg-accent" : "hover:bg-accent/50"
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-coffee-600/20 text-coffee-400 text-xs">{conv.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <p className="font-medium">{conv.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{conv.lastMessage}</p>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="flex flex-col overflow-hidden">
          <CardHeader className="border-b border-border pb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-coffee-600/20 text-coffee-400 text-xs">{chat.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm">{chat.name}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {chat.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    msg.isMe ? "bg-coffee-600 text-white" : "bg-muted"
                  }`}>
                    {!msg.isMe && <p className="mb-1 text-[10px] opacity-70">{msg.sender}</p>}
                    <p>{msg.text}</p>
                    <p className={`mt-1 text-[10px] ${msg.isMe ? "text-white/70" : "text-muted-foreground"}`}>
                      {formatDate(msg.time)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="border-t border-border p-3">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage() }}
              className="flex items-center gap-2"
            >
              <Button type="button" variant="ghost" size="icon" className="size-8 shrink-0">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit" size="icon" className="size-8 shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </PageContainer>
  )
}
