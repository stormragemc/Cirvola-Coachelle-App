import { ArrowLeft, Send, Sparkles, Globe, Bookmark } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { BottomNavigation } from "./BottomNavigation";
import { WasteData } from "./AddWasteDataForm";

interface AIValorisationChatPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  initialWasteData?: WasteData | null;
  autoPrompt?: string;
  showInitialRecommendations?: boolean;
}

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const initialSuggestions = [
  "How can I use coffee grounds?",
  "What to do with banana peels?",
  "Creative uses for citrus peels",
  "Fish bone valorisation ideas"
];

export function AIValorisationChatPage({ onBack, onNavigate, initialWasteData, autoPrompt, showInitialRecommendations }: AIValorisationChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hi! I'm Cirvola's AI Assistant 🌿\n\nTell me about your food waste, and I'll suggest creative ways to valorise it!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle initial waste data
  useEffect(() => {
    if (initialWasteData) {
      const wasteType = initialWasteData.wasteType || "food waste";
      const quantity = initialWasteData.quantity || 0;
      const unit = initialWasteData.unit || "kg";
      
      const userMessage: Message = {
        id: `user-waste-${Date.now()}`,
        type: "user",
        content: `I have ${quantity}${unit} of ${wasteType}. What can I do with it?`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setShowSuggestions(false);

      setTimeout(() => {
        setIsTyping(true);
      }, 500);

      setTimeout(() => {
        const aiResponse: Message = {
          id: `ai-waste-${Date.now()}`,
          type: "ai",
          content: getWasteDataResponse(wasteType, quantity, unit),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      }, 2000);
    }
  }, [initialWasteData]);

  // Handle auto prompt
  useEffect(() => {
    if (autoPrompt && !initialWasteData) {
      const userMessage: Message = {
        id: `user-auto-${Date.now()}`,
        type: "user",
        content: autoPrompt,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setShowSuggestions(false);

      setTimeout(() => {
        setIsTyping(true);
      }, 500);

      setTimeout(() => {
        const aiResponse: Message = {
          id: `ai-auto-${Date.now()}`,
          type: "ai",
          content: getAIResponse(autoPrompt),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      }, 2000);
    }
  }, [autoPrompt, initialWasteData]);

  // Handle recommendations
  useEffect(() => {
    if (showInitialRecommendations && !initialWasteData && !autoPrompt) {
      setTimeout(() => {
        setIsTyping(true);
      }, 500);

      setTimeout(() => {
        const aiResponse: Message = {
          id: `ai-recommendations-${Date.now()}`,
          type: "ai",
          content: "🌿 **Personalized Recommendations**\n\nBased on your waste tracking:\n\n• **Coffee Grounds** (Most Common) - Try making body scrubs or fertilizer\n• **Vegetable Peels** - Perfect for composting or vegetable stock\n• **Citrus Peels** - Create natural cleaners or candied treats\n\nWant detailed instructions for any of these?",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      }, 2000);
    }
  }, [showInitialRecommendations, initialWasteData, autoPrompt]);

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setShowSuggestions(false);

    // Show typing indicator
    setTimeout(() => {
      setIsTyping(true);
    }, 500);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        type: "ai",
        content: getAIResponse(text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const getWasteDataResponse = (wasteType: string, quantity: number, unit: string): string => {
    return `Great! You have ${quantity}${unit} of ${wasteType}. Here are some creative valorisation ideas:\n\n🌿 **Immediate Actions:**\n• Composting - Turn it into nutrient-rich soil\n• Share with community - Connect with local gardeners\n• Upcycle - Create new products\n\n💡 **Value-Added Options:**\n• Partner with local farms for animal feed\n• Start a small biogas project\n• Create artisanal products for local markets\n\nWould you like specific step-by-step instructions for any of these?`;
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("coffee")) {
      return "☕ **Coffee Grounds Valorisation Ideas:**\n\n• **Body Scrubs** - Mix with coconut oil for exfoliation\n• **Fertilizer** - Rich in nitrogen, perfect for plants\n• **Odor Absorber** - Place in fridge or closet\n• **Natural Dye** - Create brown tones for crafts\n• **Compost Accelerator** - Speeds up decomposition\n\n💡 **Business Opportunity:** Partner with local spas or create a coffee scrub product line. Potential revenue: €15-25 per 200g jar!";
    }

    if (lowerQuery.includes("banana")) {
      return "🍌 **Banana Peel Valorisation Ideas:**\n\n• **Plant Fertilizer** - Bury near plants for potassium boost\n• **Shoe Polish** - Rub inside of peel on leather\n• **Water Purifier** - Removes heavy metals from water\n• **Teeth Whitener** - Rub inside of peel on teeth\n• **Compost Material** - Breaks down quickly\n\n💡 **Eco-Hack:** Dry and grind into powder for a nutrient-rich plant supplement. Partner with gardening stores!";
    }

    if (lowerQuery.includes("citrus") || lowerQuery.includes("orange") || lowerQuery.includes("lemon")) {
      return "🍊 **Citrus Peel Valorisation Ideas:**\n\n• **Essential Oils** - Steam distillation for aromatherapy\n• **Candied Peels** - Sweet treat for desserts\n• **Natural Cleaner** - Vinegar infusion for cleaning\n• **Potpourri** - Dried peels with spices\n• **Zest Powder** - Dehydrate and grind for cooking\n\n💡 **Premium Product:** Create artisanal citrus-infused olive oils. Market value: €12-18 per 250ml bottle!";
    }

    if (lowerQuery.includes("fish")) {
      return "🐟 **Fish Bone & Waste Valorisation:**\n\n• **Fish Stock** - Simmer for rich broth base\n• **Pet Food** - Calcium-rich treats for animals\n• **Fertilizer** - High in phosphorus and calcium\n• **Collagen Extract** - For cosmetics industry\n• **Bone Meal** - Garden soil amendment\n\n💡 **High-Value Path:** Extract collagen for beauty products or partner with pet food manufacturers. Industrial collagen fetches €25-40/kg!";
    }

    return "🌿 **General Valorisation Strategies:**\n\n• **Composting** - Turn waste into nutrient-rich soil\n• **Animal Feed** - Partner with farms for organic feed\n• **Biogas Production** - Convert to renewable energy\n• **Upcycled Products** - Create new consumer goods\n• **Community Sharing** - Connect with local gardeners\n\n💡 **Next Steps:**\n1. Identify your most common waste type\n2. Research local demand\n3. Start small with home trials\n4. Scale based on results\n\nWhat specific waste type do you want to explore?";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a2332] flex flex-col">
      <div className="max-w-md mx-auto w-full flex flex-col min-h-screen">
        {/* Header */}
        <div className="bg-white dark:bg-[#1a2332] border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={onBack} className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1 -ml-1">
              <ArrowLeft className="w-5 h-5 text-gray-900 dark:text-white" />
            </button>
            
            <div className="w-10 h-10 rounded-full bg-[#8BC34A] dark:bg-[#6ba03f] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-gray-900 dark:text-white truncate">AI Valorisation Assistant</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your circular economy companion</p>
            </div>

            <div className="flex items-center gap-2">
              <button className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2">
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2">
                <Bookmark className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-4 bg-[#F8FBF7] dark:bg-[#1a2332]"
        >
          {messages.map((message) => (
            <div key={message.id} className="mb-3">
              {message.type === "ai" ? (
                <div className="flex gap-2 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#8BC34A] dark:bg-[#6ba03f] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-[#E6F5E1]/60 dark:bg-[#2a3f2b]/60 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 inline-block max-w-[85%] border border-[#8BC34A]/20 dark:border-[#6ba03f]/30">
                      <p className="text-gray-900 dark:text-white text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-1">{formatTime(message.timestamp)}</p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <div className="max-w-[85%]">
                    <div className="bg-[#FFF9E6]/70 dark:bg-[#3d3420]/60 backdrop-blur-sm rounded-2xl rounded-tr-sm px-4 py-3 inline-block border border-[#F6C83B]/30 dark:border-[#F6C83B]/25">
                      <p className="text-gray-900 dark:text-white text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mr-1 text-right">{formatTime(message.timestamp)}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="mb-3">
              <div className="flex gap-2 items-start">
                <div className="w-8 h-8 rounded-full bg-[#8BC34A] dark:bg-[#6ba03f] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-[#E6F5E1]/60 dark:bg-[#2a3f2b]/60 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 border border-[#8BC34A]/20 dark:border-[#6ba03f]/30">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#8BC34A] dark:bg-[#6ba03f] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-[#8BC34A] dark:bg-[#6ba03f] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-[#8BC34A] dark:bg-[#6ba03f] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {showSuggestions && messages.length === 1 && (
          <div className="px-4 pb-3 bg-[#F8FBF7] dark:bg-[#1a2332]">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-3">Try asking</p>
            <div className="space-y-2">
              {initialSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(suggestion)}
                  className="w-full text-left px-4 py-3 bg-white dark:bg-[#2d3a4d] border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-[#3d4a5d] transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-white dark:bg-[#1a2332] border-t border-gray-200 dark:border-gray-700 px-4 py-3 pb-20">
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask me how to valorise your food waste..."
              className="flex-1 px-4 py-3 bg-[#F8FBF7] dark:bg-[#2d3a4d] border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8BC34A] dark:focus:ring-[#6ba03f]"
            />
            <button
              onClick={() => handleSendMessage()}
              className="w-10 h-10 rounded-full bg-[#F8FBF7] dark:bg-[#2d3a4d] border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#3d4a5d] transition-colors disabled:opacity-50"
              disabled={!inputValue.trim()}
            >
              <Send className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">AI can make mistakes. Verify important information.</p>
          {/* Separator line above bottom nav */}
          <div className="absolute bottom-14 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/40 dark:via-gray-600/30 to-transparent"></div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activePage="valorise" onNavigate={onNavigate} />
      </div>
    </div>
  );
}
