import { useState, useRef, useEffect } from "react";
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MessageSquare,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AIAssistant = ({ isOpen, onClose, userContext }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hello! I'm Real Estate King, your AI assistant. I can help you with information about your properties, rent collection, pending requests, and more. How can I assist you today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Mock AI response (replace with actual API call)
    setTimeout(() => {
      const responses = [
        `Based on your portfolio, you have ${
          userContext?.totalProperties || 5
        } properties with an occupancy rate of ${
          userContext?.occupancyRate || 85
        }%. Your monthly rental income is ₺${(
          userContext?.monthlyIncome || 45000
        ).toLocaleString()}.`,
        `You currently have ${
          userContext?.pendingRequests || 3
        } pending service requests. Would you like me to provide details about them?`,
        `Your property at ${
          userContext?.recentProperty || "Beşiktaş"
        } has been performing well with consistent rent payments. The tenant's lease is up for renewal in 2 months.`,
        `I can help you with property valuations, tenant screening, contract reviews, and maintenance tracking. What would you like to know more about?`,
      ];

      const aiResponse = {
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    // Mock voice input (replace with actual Whisper API)
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setInput("What is my total monthly income?");
        setIsListening(false);
      }, 2000);
    }
  };

  const handleTextToSpeech = () => {
    // Mock TTS (replace with actual TTS API)
    setIsSpeaking(!isSpeaking);
    setTimeout(() => {
      setIsSpeaking(false);
    }, 3000);
  };

  const suggestedQuestions = [
    "What is my occupancy rate?",
    "Show pending requests",
    "Latest tenant applications",
    "Monthly income report",
  ];

  if (!isOpen) {
    return (
      <Button
        onClick={onClose}
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-glow bg-gradient-accent hover:scale-110 transition-all"
        style={{ zIndex: 10000 }}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card
      className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col shadow-elegant animate-fade-in"
      style={{ zIndex: 10000 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="font-display font-semibold">Real Estate King</h3>
            <p className="text-xs opacity-90">AI Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:text-accent"
            onClick={handleTextToSpeech}
          >
            {isSpeaking ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:text-accent"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-75"></div>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggested Questions */}
      <div className="px-4 py-2 border-t border-border bg-muted/30">
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-smooth text-xs"
              onClick={() => setInput(question)}
            >
              {question}
            </Badge>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1"
          />
          <Button
            size="icon"
            variant={isListening ? "destructive" : "outline"}
            onClick={handleVoiceInput}
          >
            {isListening ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
          <Button
            size="icon"
            onClick={handleSend}
            className="bg-gradient-accent"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {isListening ? "Listening..." : "Type or speak your question"}
        </p>
      </div>
    </Card>
  );
};
