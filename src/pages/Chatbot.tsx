import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  Mic, 
  Globe, 
  Plus,
  CheckCircle,
  Circle,
  Clock,
  User,
  Bot,
  X,
  MoreVertical
} from "lucide-react";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(1);

  const chatSessions = [
    { 
      id: 1, 
      title: "Small Business Innovation Grant", 
      progress: 75, 
      status: "In Progress",
      lastMessage: "Let's review your business plan...",
      timestamp: "2 hours ago"
    },
    { 
      id: 2, 
      title: "Renewable Energy Startup Fund", 
      progress: 100, 
      status: "Submitted",
      lastMessage: "Application submitted successfully!",
      timestamp: "1 day ago"
    },
    { 
      id: 3, 
      title: "Women in Tech Grant", 
      progress: 30, 
      status: "Draft",
      lastMessage: "What's your company's mission?",
      timestamp: "3 days ago"
    }
  ];

  const messages = [
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm your GrantBot assistant. I'm here to help you apply for the Small Business Innovation Research (SBIR) Grant. Let's start by telling me about your business.",
      timestamp: "10:30 AM"
    },
    {
      id: 2,
      type: "user",
      content: "Hi! We're a tech startup developing AI-powered healthcare solutions.",
      timestamp: "10:32 AM"
    },
    {
      id: 3,
      type: "bot",
      content: "That sounds fascinating! AI in healthcare is definitely aligned with SBIR priorities. Can you tell me more about your specific solution? What problem does it solve?",
      timestamp: "10:33 AM"
    },
    {
      id: 4,
      type: "user",
      content: "We're developing an AI system that can predict patient readmissions by analyzing medical records and social determinants of health.",
      timestamp: "10:35 AM"
    },
    {
      id: 5,
      type: "bot",
      content: "Excellent! That addresses a critical healthcare challenge. For the SBIR application, we'll need to demonstrate the innovation and commercial potential. Let me help you prepare the required documents. Have you completed any preliminary research or pilot studies?",
      timestamp: "10:36 AM"
    }
  ];

  const checklist = [
    { item: "Business Information", completed: true },
    { item: "Project Description", completed: true },
    { item: "Technical Approach", completed: false, current: true },
    { item: "Market Analysis", completed: false },
    { item: "Budget Breakdown", completed: false },
    { item: "Team Qualifications", completed: false },
    { item: "Commercialization Plan", completed: false },
    { item: "Supporting Documents", completed: false }
  ];

  const grantInfo = {
    title: "Small Business Innovation Research (SBIR)",
    organization: "National Science Foundation",
    amount: "$1,500,000",
    deadline: "March 15, 2024",
    phase: "Phase II",
    duration: "24 months"
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar - Chat Sessions */}
      <div className="w-80 border-r bg-card/50 flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Grant Applications</h2>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to Dashboard
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {chatSessions.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                selectedChat === chat.id ? "bg-muted border-l-4 border-l-primary" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-sm leading-tight">{chat.title}</h3>
                <Badge 
                  variant={chat.status === "Submitted" ? "default" : chat.status === "In Progress" ? "secondary" : "outline"}
                  className="text-xs ml-2"
                >
                  {chat.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{chat.lastMessage}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                <div className="flex items-center gap-1">
                  <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${chat.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{chat.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center - Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b bg-background p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold">GrantBot Assistant</h1>
                <p className="text-sm text-muted-foreground">SBIR Grant Application</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.type === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.type === "bot" ? "bg-primary" : "bg-accent"
              }`}>
                {msg.type === "bot" ? (
                  <Bot className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <User className="h-4 w-4 text-accent-foreground" />
                )}
              </div>
              <div className={`max-w-lg ${msg.type === "user" ? "text-right" : ""}`}>
                <div className={`inline-block p-3 rounded-lg ${
                  msg.type === "bot" 
                    ? "bg-muted text-foreground" 
                    : "bg-primary text-primary-foreground"
                }`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="border-t bg-background p-4">
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Mic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Globe className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - Checklist & Grant Info */}
      <div className="w-80 border-l bg-card/50 flex flex-col">
        {/* Grant Information */}
        <Card className="m-4 mb-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Grant Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium">{grantInfo.title}</p>
              <p className="text-xs text-muted-foreground">{grantInfo.organization}</p>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">{grantInfo.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Deadline:</span>
                <span className="font-medium text-orange-600">{grantInfo.deadline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phase:</span>
                <span className="font-medium">{grantInfo.phase}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">{grantInfo.duration}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Checklist */}
        <Card className="m-4 mt-2 flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Application Progress
              <span className="text-sm font-normal text-muted-foreground">3/8 Complete</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {checklist.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    item.current ? "bg-primary/5 border border-primary/20" : ""
                  }`}
                >
                  {item.completed ? (
                    <CheckCircle className="h-4 w-4 text-accent" />
                  ) : item.current ? (
                    <Clock className="h-4 w-4 text-primary" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={`text-sm ${
                    item.completed ? "text-muted-foreground line-through" : 
                    item.current ? "font-medium" : ""
                  }`}>
                    {item.item}
                  </span>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Paperclip className="h-4 w-4 mr-2" />
                Upload Documents
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Preview Application
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;