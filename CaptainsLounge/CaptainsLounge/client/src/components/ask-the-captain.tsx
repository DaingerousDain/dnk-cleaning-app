import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { captainsFaqs, type FaqItem } from "@shared/schema";
import { Send, MessageCircle, Mail } from "lucide-react";

interface ChatMessage {
  id: string;
  type: 'user' | 'captain';
  content: string;
  timestamp: Date;
  relatedFaq?: FaqItem;
}

interface FaqMatch {
  faq: FaqItem;
  score: number;
  matchType: 'exact' | 'phrase' | 'tag' | 'fuzzy';
}

export default function AskTheCaptain() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      type: 'captain',
      content: "Ahoy! I'm Captain's Assistant. Ask me anything about our heritage lounge in Galle Fort - pricing, services, location, or facilities. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Popular quick questions
  const quickQuestions = [
    "How much does it cost?",
    "What time slots are available?",
    "Where are you located?",
    "What's included in booking?",
    "Can I store luggage?"
  ];

  // FAQ matching algorithm
  const findBestMatches = (query: string): FaqMatch[] => {
    const normalizedQuery = query.toLowerCase().trim();
    const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 2);
    
    if (queryWords.length === 0) return [];

    const matches: FaqMatch[] = [];

    captainsFaqs.forEach(faq => {
      let score = 0;
      let matchType: FaqMatch['matchType'] = 'fuzzy';

      // Exact question match
      if (faq.question.toLowerCase().includes(normalizedQuery)) {
        score += 100;
        matchType = 'exact';
      }

      // Alternative phrase matching
      faq.altPhrases.forEach(phrase => {
        if (phrase.toLowerCase().includes(normalizedQuery) || normalizedQuery.includes(phrase.toLowerCase())) {
          score += 80;
          if (matchType === 'fuzzy') matchType = 'phrase';
        }
      });

      // Tag matching
      faq.tags.forEach(tag => {
        if (queryWords.includes(tag.toLowerCase())) {
          score += 60;
          if (matchType === 'fuzzy') matchType = 'tag';
        }
      });

      // Word overlap scoring
      const allFaqText = `${faq.question} ${faq.altPhrases.join(' ')} ${faq.tags.join(' ')}`.toLowerCase();
      const overlapScore = queryWords.reduce((acc, word) => {
        return acc + (allFaqText.includes(word) ? 20 : 0);
      }, 0);
      
      score += overlapScore;

      // Boost score for partial word matches
      queryWords.forEach(word => {
        if (word.length >= 4) {
          const regex = new RegExp(word, 'i');
          if (regex.test(allFaqText)) {
            score += 10;
          }
        }
      });

      if (score > 30) { // Minimum confidence threshold
        matches.push({ faq, score, matchType });
      }
    });

    return matches.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  const handleSendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    // Add user message
    const userMessageObj: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessageObj]);
    setInput("");
    setIsTyping(true);

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find matching FAQs
    const matches = findBestMatches(userMessage);

    let captainResponse: string;
    let relatedFaq: FaqItem | undefined;

    if (matches.length > 0 && matches[0].score > 50) {
      // Good match found
      const bestMatch = matches[0];
      captainResponse = bestMatch.faq.answer;
      relatedFaq = bestMatch.faq;

      // Add follow-up if multiple good matches
      if (matches.length > 1 && matches[1].score > 40) {
        captainResponse += `\n\nYou might also be interested in: "${matches[1].faq.question}"`;
      }
    } else {
      // No good match - provide fallback with email links
      captainResponse = `I don't have a specific answer for that question, but I'd be happy to help! For detailed inquiries, please contact us directly:

📧 **General Information:** info@princeofgalle.com
📧 **Immediate Assistance:** daindm@yahoo.com

Or try asking about:
• Pricing and booking rates
• Available time slots
• Location and directions  
• Included amenities and services
• Heritage building history

What else would you like to know about Captain's Lounge?`;
    }

    setIsTyping(false);

    const captainMessageObj: ChatMessage = {
      id: `captain-${Date.now()}`,
      type: 'captain',
      content: captainResponse,
      timestamp: new Date(),
      relatedFaq
    };

    setMessages(prev => [...prev, captainMessageObj]);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="bg-[#B8860B] text-white">
        <CardTitle className="flex items-center gap-2 text-xl">
          <MessageCircle className="w-6 h-6" />
          Ask The Captain
          <span className="text-sm font-normal opacity-90">- Heritage Concierge</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Quick Questions */}
        <div className="p-4 border-b bg-muted/30">
          <p className="text-sm text-muted-foreground mb-2">Popular questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickQuestion(question)}
                className="text-xs"
                data-testid={`button-quick-question-${index}`}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                    message.type === 'user'
                      ? 'bg-[#B8860B] text-white'
                      : 'bg-muted border'
                  }`}
                  data-testid={`message-${message.type}-${message.id}`}
                >
                  <div className="text-sm">{message.content}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted border p-3 rounded-lg">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <span className="text-xs text-muted-foreground ml-2">Captain is typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about pricing, services, location, or anything else..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(input);
                }
              }}
              className="flex-1"
              data-testid="input-ask-captain"
            />
            <Button
              onClick={() => handleSendMessage(input)}
              disabled={!input.trim() || isTyping}
              className="bg-[#B8860B] hover:bg-[#A0730A]"
              data-testid="button-send-question"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>Press Enter to send</span>
            <div className="flex items-center gap-4">
              <a 
                href="mailto:info@princeofgalle.com" 
                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                data-testid="link-email-info"
              >
                <Mail className="w-3 h-3" />
                General Info
              </a>
              <a 
                href="mailto:daindm@yahoo.com" 
                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                data-testid="link-email-direct"
              >
                <Mail className="w-3 h-3" />
                Direct Contact
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}