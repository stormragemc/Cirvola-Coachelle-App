import { ArrowLeft, Upload, Send, Sparkles, Bookmark, Globe, Image as ImageIcon, ExternalLink, Mic, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BottomNavigation } from "./BottomNavigation";

const cirvolaLogo = "https://i.ibb.co/ZpfbJxGS/Cirvola-logo.png";

interface AIAssistantPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  image?: string;
}

interface SuggestionCardProps {
  icon: string;
  title: string;
  description: string;
  action: string;
  onClick?: () => void;
}

function SuggestionCard({ icon, title, description, action, onClick }: SuggestionCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="min-w-[260px] bg-white dark:bg-[#2d3a4d] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex-shrink-0 cursor-pointer transition-colors duration-300"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[#8BC34A] to-[#7CB342] dark:from-[#6ba03f] dark:to-[#5a8c3a] rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-xl">{icon}</span>
        </div>
        <div className="flex-1">
          <h4 className="text-sm text-gray-900 dark:text-white mb-1">{title}</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <button className="w-full bg-[#EAF6E3] dark:bg-[#2a3f2b] text-gray-900 dark:text-gray-100 py-2 rounded-lg text-xs hover:bg-[#d8ecc9] dark:hover:bg-[#3d5a2d] transition-colors flex items-center justify-center gap-1">
        <ExternalLink className="w-3 h-3" />
        {action}
      </button>
    </motion.div>
  );
}

interface RelatedThreadProps {
  title: string;
  replies: number;
  onClick: () => void;
}

function RelatedThread({ title, replies, onClick }: RelatedThreadProps) {
  return (
    <motion.div
      whileHover={{ x: 2 }}
      onClick={onClick}
      className="bg-white dark:bg-[#2d3a4d] rounded-xl p-3 border border-gray-100 dark:border-gray-700 shadow-sm cursor-pointer hover:shadow-md transition-all"
    >
      <p className="text-sm text-gray-900 dark:text-white mb-1">{title}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{replies} replies • Trending</p>
    </motion.div>
  );
}

export function AIAssistantPage({ onBack, onNavigate }: AIAssistantPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hi! I'm your Cirvola AI Valorisation Assistant 🌿\n\nI'm here to help you with:\n• Creative food waste valorisation ideas\n• Upcycling techniques and processes\n• Finding partners and resources\n• Answering questions about circular economy\n\nWhat would you like to know about turning waste into value?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showRelatedThreads, setShowRelatedThreads] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    // Coffee grounds
    if (lowerInput.includes("coffee")) {
      return "☕ **Coffee Grounds Valorisation Ideas**\n\nGreat question! Coffee grounds are incredibly versatile:\n\n🧴 **Beauty & Personal Care**\n• Exfoliating body scrubs (mix with coconut oil)\n• Natural hair treatment for shine\n• Anti-cellulite massage bars\n\n🌱 **Agriculture & Gardening**\n• Nitrogen-rich compost additive\n• Mushroom growing substrate\n• Natural pest repellent for gardens\n\n🏠 **Household Products**\n• Odor-absorbing sachets for fridges\n• Natural cleaning abrasive\n• Eco-friendly candles with coffee scent\n\n🎨 **Creative Uses**\n• Natural brown dye for fabrics\n• Art supplies (coffee paint)\n• Biofuel production\n\n💡 **Most Profitable:** Body scrubs and mushroom substrate typically have the highest value-add. Would you like detailed guidance on any of these approaches?";
    }
    
    // Citrus
    if (lowerInput.includes("citrus") || lowerInput.includes("orange") || lowerInput.includes("lemon")) {
      return "🍊 **Citrus Peel Valorisation**\n\nExcellent choice! Citrus peels have amazing potential:\n\n✨ **Essential Oils**\n• D-limonene extraction (high commercial value)\n• Aromatherapy oil production\n• Natural cleaning product ingredient\n\n🍽️ **Food Products**\n• Candied peels for confectionery\n• Citrus zest powder (dehydrated)\n• Pectin extraction for jams\n• Flavoring for teas and beverages\n\n🧪 **Chemical Compounds**\n• Bioactive compounds for supplements\n• Natural preservatives\n• Anti-inflammatory extracts\n\n🏠 **Household**\n• All-purpose cleaners\n• Air fresheners and potpourri\n• Natural insect repellent\n\n📊 **Market Insight:** D-limonene sells for €8-15/kg. From 1kg of citrus peels, you can extract about 50-100ml of oil. Would you like to explore extraction methods?";
    }
    
    // Fish/seafood
    if (lowerInput.includes("fish") || lowerInput.includes("seafood") || lowerInput.includes("shell")) {
      return "🐟 **Seafood Waste Valorisation**\n\nSeafood waste is a goldmine! Here's what you can create:\n\n💊 **High-Value Products**\n• Collagen supplements (from skin & bones)\n• Omega-3 fish oil extraction\n• Chitosan from shells (medical applications)\n• Glucosamine for joint health\n\n🍽️ **Food Applications**\n• Fish bone meal (calcium supplement)\n• Protein hydrolysates (umami flavoring)\n• Fish sauce from scraps\n• Crunchy fish bone crackers (popular in Asia)\n\n🌾 **Agriculture**\n• Organic fertilizer (NPK 4-2-1)\n• Animal feed protein supplement\n• Aquaculture feed ingredient\n\n🧬 **Biotechnology**\n• Gelatin production\n• Bioactive peptides\n• Pharmaceutical compounds\n\n💰 **Revenue Potential:** Fish collagen can sell for €30-50/kg. The global market is growing 8% annually. Interested in connecting with processing facilities?";
    }
    
    // Dairy
    if (lowerInput.includes("dairy") || lowerInput.includes("whey") || lowerInput.includes("milk")) {
      return "🥛 **Dairy Waste Valorisation**\n\nDairy byproducts have excellent valorisation potential:\n\n💪 **Protein Products**\n• Whey protein concentrate/isolate\n• Protein bars and supplements\n• Sports nutrition products\n• Infant formula ingredients\n\n♻️ **Bioplastics**\n• Biodegradable films from casein\n• Food packaging materials\n• Agricultural mulch films\n\n🌱 **Agriculture**\n• Protein-rich animal feed\n• Probiotic supplements for livestock\n• Organic fertilizer\n\n🧴 **Cosmetics**\n• Lactic acid for skincare\n• Natural moisturizers\n• Soap and shampoo ingredients\n\n⚡ **Biogas Production**\n• Anaerobic digestion for energy\n• Methane capture\n\n💡 **Opportunity:** The global whey protein market is worth over $10 billion. Even small-scale operations can be profitable. Want to explore partnerships?";
    }
    
    // Bread/bakery
    if (lowerInput.includes("bread") || lowerInput.includes("bakery") || lowerInput.includes("dough")) {
      return "🍞 **Bakery Waste Valorisation**\n\nDay-old bread and bakery waste can be transformed:\n\n🍺 **Beverages**\n• Bread beer (trending craft beer style)\n• Kvass (traditional fermented drink)\n• Vinegar production\n• Ethanol extraction\n\n🍽️ **Food Products**\n• Premium breadcrumbs and panko\n• Croutons and stuffing mixes\n• Bread pudding mixes\n• Breadsticks and rusks\n\n🐄 **Animal Feed**\n• Dried bread meal for livestock\n• Poultry feed supplement\n• Fish feed ingredient\n\n🔬 **Biotechnology**\n• Enzyme production (amylase)\n• Bioethanol fermentation\n• Citric acid production\n\n📦 **Packaging**\n• Starch-based bioplastics\n• Compostable packaging materials\n\n🌟 **Success Story:** Toast Ale in UK makes award-winning beer from surplus bread, saving 2.5 tons/week. Interested in similar partnerships?";
    }
    
    // Produce/vegetables
    if (lowerInput.includes("vegetable") || lowerInput.includes("produce") || lowerInput.includes("peel")) {
      return "🥬 **Produce Waste Valorisation**\n\nVegetable scraps and peels have diverse applications:\n\n🎨 **Natural Products**\n• Vegetable dyes (beetroot, spinach, carrot)\n• Natural food colorings\n• Textile dyeing\n• Eco-friendly paints\n\n🥤 **Food & Beverage**\n• Vegetable broth concentrate\n• Dried veggie powder (seasoning)\n• Juice and smoothie bases\n• Pickled vegetable medleys\n\n💊 **Nutraceuticals**\n• Fiber supplements\n• Antioxidant extracts\n• Vitamin-rich powders\n• Functional food ingredients\n\n♻️ **Environmental**\n• Biogas production\n• Composting for urban farms\n• Vermicomposting\n• Biodegradable plant pots\n\n📊 **Market Potential:** Natural food colors market is $2.5B globally. Vegetable-based dyes are in high demand from sustainable fashion brands. Want supplier connections?";
    }
    
    // Mango (specific)
    if (lowerInput.includes("mango")) {
      return "🥭 **Mango Waste Valorisation**\n\nMango peels and seeds are treasure troves:\n\n🧴 **Cosmetics & Health**\n• Antioxidant face masks\n• Mango butter from kernels\n• Anti-aging serum ingredients\n• Vitamin C extracts\n\n🍬 **Food Products**\n• Pectin from peels (gelling agent)\n• Mango peel chutney\n• Dried mango peel candy\n• Natural food preservatives\n\n🌾 **Agriculture**\n• Cattle feed (dried peels)\n• Organic fertilizer\n• Biochar production\n• Compost enhancer\n\n🎨 **Industrial**\n• Yellow-orange natural dye\n• Biodegradable packaging\n• Starch extraction from seeds\n\n💰 **Revenue Opportunity:** Mango seed kernel oil sells for €15-25/kg. Antioxidants from peel can fetch even higher prices in cosmetic markets. Interested in processing techniques?";
    }
    
    // General/default response
    return "🌿 **I'd love to help with that!**\n\nCould you tell me more about:\n• What type of food waste you have?\n• What scale you're working with (kg/day or kg/week)?\n• What you're most interested in: selling products, reducing waste, or environmental impact?\n\nMeanwhile, here are some popular valorisation approaches:\n\n✨ **High-Value Options:**\n• Essential oil extraction\n• Supplement/nutraceutical production\n• Specialty food products\n• Cosmetic ingredients\n\n♻️ **Sustainable Solutions:**\n• Composting and fertilizers\n• Animal feed supplements\n• Biogas production\n• Biodegradable materials\n\n💡 **Trending Now:**\n☕ Coffee ground upcycling\n🍊 Citrus peel processing\n🐟 Seafood waste to collagen\n🍫 Cocoa husk valorisation\n\nWhat interests you most?";
  };

  const handleSend = () => {
    if (!inputValue.trim() && !uploadedImage) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue || "I uploaded an image",
      timestamp: new Date(),
      image: uploadedImage || undefined,
    };
    setMessages((prev) => [...prev, userMessage]);
    
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    // Simulate AI typing and response
    setTimeout(() => {
      setIsTyping(false);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(currentInput),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setShowSuggestions(true);
      setShowRelatedThreads(true);
      setUploadedImage(null);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
    setTimeout(() => handleSend(), 100);
  };

  const suggestions = [
    {
      icon: "🧪",
      title: "Extraction Methods",
      description: "Learn about extracting valuable compounds from waste",
      action: "See Techniques",
    },
    {
      icon: "🤝",
      title: "Find Partners",
      description: "Connect with processors and buyers in your area",
      action: "Browse Network",
    },
    {
      icon: "💰",
      title: "Market Insights",
      description: "Discover pricing and demand for valorised products",
      action: "View Reports",
    },
  ];

  const relatedThreads = [
    { title: "What's the best waste stream to start with?", replies: 34 },
    { title: "Small-scale valorisation success stories", replies: 28 },
    { title: "How to calculate ROI on upcycling projects", replies: 19 },
  ];

  const quickPrompts = [
    "How do I start a valorisation business?",
    "What equipment do I need?",
    "How to find buyers for upcycled products?",
    "Best practices for food safety compliance",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7F2] dark:from-[#1a2332] to-white dark:to-[#1e2738] transition-colors duration-300 pb-20">
      <div className="max-w-md mx-auto w-full flex flex-col min-h-screen">
        {/* Header */}
        <div className="bg-white dark:bg-[#1a2332] px-5 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700 shadow-sm flex-shrink-0 transition-colors duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1">
              <h2 className="text-gray-900 dark:text-white">AI Valorisation Assistant</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ask me anything about food waste valorisation</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                <Globe className="w-5 h-5" />
              </button>
              <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Messages - Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-5 py-6 pb-32">
          <div className="space-y-4">
            {messages.map((message) => (
              <AnimatePresence key={message.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    {/* Avatar */}
                    {message.type === "ai" && (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8BC34A] to-[#7CB342] dark:from-[#6ba03f] dark:to-[#5a8c3a] flex items-center justify-center flex-shrink-0 shadow-sm">
                        <img src={cirvolaLogo} alt="AI" className="w-5 h-5" />
                      </div>
                    )}
                    {message.type === "user" && (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F6C83B] to-[#f4a93d] flex items-center justify-center flex-shrink-0 shadow-sm">
                        <span className="text-sm">👤</span>
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`rounded-2xl px-4 py-3 backdrop-blur-sm ${
                        message.type === "user"
                          ? "bg-[#FFF9E6]/70 dark:bg-[#3d3420]/60 text-gray-900 dark:text-gray-100 border border-[#F6C83B]/30 dark:border-[#F6C83B]/25"
                          : "bg-[#EAF6E3]/60 dark:bg-[#2a3f2b]/60 text-gray-900 dark:text-gray-100 border border-[#8BC34A]/20 dark:border-[#6ba03f]/30"
                      }`}
                    >
                      {message.image && (
                        <div className="mb-2 rounded-lg overflow-hidden">
                          <img src={message.image} alt="Uploaded" className="w-full h-32 object-cover" />
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className={`text-xs mt-1.5 ${message.type === "user" ? "text-gray-500 dark:text-gray-400" : "text-gray-500 dark:text-gray-400"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex gap-2 max-w-[85%]">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8BC34A] to-[#7CB342] dark:from-[#6ba03f] dark:to-[#5a8c3a] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <img src={cirvolaLogo} alt="AI" className="w-5 h-5" />
                  </div>
                  <div className="bg-[#EAF6E3]/60 dark:bg-[#2a3f2b]/60 backdrop-blur-sm rounded-2xl px-4 py-3 border border-[#8BC34A]/20 dark:border-[#6ba03f]/30">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#8BC34A] dark:bg-[#6ba03f] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-[#8BC34A] dark:bg-[#6ba03f] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-[#8BC34A] dark:bg-[#6ba03f] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Quick Prompts (shown after first message) */}
            {messages.length <= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-2"
              >
                <div className="flex items-center gap-2 mb-3 px-1">
                  <Sparkles className="w-4 h-4 text-[#F6C83B]" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">Try asking:</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickPrompt(prompt)}
                      className="bg-white dark:bg-[#2d3a4d] hover:bg-[#EAF6E3] dark:hover:bg-[#2a3f2b] border border-gray-200 dark:border-gray-600 rounded-full px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300 hover:border-[#8BC34A] dark:hover:border-[#6ba03f] transition-all"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* AI Suggestion Cards */}
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-2"
              >
                <div className="flex items-center gap-2 mb-3 px-1">
                  <Sparkles className="w-4 h-4 text-[#F6C83B]" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">Explore more:</p>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
                  {suggestions.map((suggestion, idx) => (
                    <SuggestionCard key={idx} {...suggestion} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Related Discussions */}
            {showRelatedThreads && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <div className="bg-gradient-to-br from-[#EAF6E3] dark:from-[#2a3f2b] to-white dark:to-[#2d3a4d] rounded-xl p-4 border border-[#8BC34A]/20 dark:border-[#6ba03f]/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm text-gray-900 dark:text-white">Related community discussions 👇</h4>
                    <button
                      onClick={() => onNavigate("discussion-forum")}
                      className="text-xs text-[#8BC34A] dark:text-[#6ba03f] hover:text-[#7CB342] dark:hover:text-[#5a8c3a]"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {relatedThreads.map((thread, idx) => (
                      <RelatedThread
                        key={idx}
                        {...thread}
                        onClick={() => onNavigate("discussion-forum")}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Floating CTA - Explore Community */}
        {showRelatedThreads && (
          <div className="px-5 pb-3 flex-shrink-0">
            <button
              onClick={() => onNavigate("community-stories")}
              className="w-full bg-gradient-to-r from-[#F6C83B] to-[#f4a93d] text-gray-900 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              💡 Browse Success Stories
            </button>
          </div>
        )}

        {/* Input Bar - Fixed at Bottom */}
        <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-[#1a2332] px-4 py-3 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300 z-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me how to valorise your food waste..."
                className="flex-1 px-4 py-3 bg-[#F8FBF7] dark:bg-[#2d3a4d] border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8BC34A] dark:focus:ring-[#6ba03f]"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 rounded-full bg-[#F8FBF7] dark:bg-[#2d3a4d] border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#3d4a5d] transition-colors disabled:opacity-50"
                disabled={!inputValue.trim()}
              >
                <Send className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">AI can make mistakes. Verify important information.</p>
            {/* Separator line above bottom nav */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/40 dark:via-gray-600/30 to-transparent"></div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activePage="valorise" onNavigate={onNavigate} />
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
