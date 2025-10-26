import { useState, useEffect } from "react";
import { Bell, User, Moon, Sun } from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import { CircularLivingHero } from "./components/CircularLivingHero";
import { CircularJourneyTracker } from "./components/CircularJourneyTracker";
import { WasteStreamMapEnhanced } from "./components/WasteStreamMapEnhanced";
import { ImpactSnapshot } from "./components/ImpactSnapshot";
import { CommunityValorisationFeed, Story } from "./components/CommunityValorisationFeed";
import { WeeklyChallengeCard } from "./components/WeeklyChallengeCard";
import { FooterCTA } from "./components/FooterCTA";

import { BottomNavigation } from "./components/BottomNavigation";
import { MapPage } from "./components/MapPage";
import { CircularNetworkMapEnhanced } from "./components/CircularNetworkMapEnhanced";
import { ESGReportPage } from "./components/ESGReportPage";
import { ValorisePage } from "./components/ValorisePage";
import { AIValorisationChatPage } from "./components/AIValorisationChatPage";
import { AIAssistantPage } from "./components/AIAssistantPage";
import { CommunityStoriesPage } from "./components/CommunityStoriesPage";
import { DiscussionForumPage } from "./components/DiscussionForumPage";
import { ShopPage } from "./components/ShopPage";
import { ProfilePage } from "./components/ProfilePage";
import { CheckoutPage } from "./components/CheckoutPage";
import { CommunityPage } from "./components/CommunityPage";
import { CreatePostPage } from "./components/CreatePostPage";
import { ChallengeSubmissionPage } from "./components/ChallengeSubmissionPage";
import { AddWasteDataForm, WasteData } from "./components/AddWasteDataForm";
import { ImpactDetailsPage } from "./components/ImpactDetailsPage";
import { NotificationsPage } from "./components/NotificationsPage";
import { PostDetailPage, Post } from "./components/PostDetailPage";
import { LocationDetailsPage } from "./components/LocationDetailsPage";

const cirvolaLogo = "https://i.ibb.co/ZpfbJxGS/Cirvola-logo.png";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [showAddWasteForm, setShowAddWasteForm] = useState(false);
  const [wasteDataSubmission, setWasteDataSubmission] = useState<WasteData | null>(null);
  const [aiAutoPrompt, setAiAutoPrompt] = useState<string | undefined>(undefined);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  // Handle dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  const [checkoutItems, setCheckoutItems] = useState<any[]>([
    {
      id: "1",
      name: "Cocoa Husk Chocolate Pudding",
      price: 5.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1673551491291-5b17d2842988?w=300",
      source: "Cocoa Husks",
      wasteOffset: 0.25,
    },
    {
      id: "2",
      name: "Crunchy Fish Bone Crackers",
      price: 4.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=300",
      source: "Fish Bones",
      wasteOffset: 0.18,
    },
    {
      id: "3",
      name: "Coffee Grounds Gelato",
      price: 6.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1657220644506-77fa47a3487b?w=300",
      source: "Coffee Grounds",
      wasteOffset: 0.32,
    },
  ]);

  // Show ESG Report page when currentPage is "esg-report"
  if (currentPage === "esg-report") {
    return (
      <ESGReportPage 
        onBack={() => setCurrentPage("map")} 
        onNavigate={setCurrentPage}
        onViewRecommendations={() => {
          // Reset other auto-triggers to ensure only recommendations show
          setAiAutoPrompt(undefined);
          setWasteDataSubmission(null);
          setShowRecommendations(true);
          setCurrentPage("ai-chat");
        }}
      />
    );
  }

  // Show Location Details page when currentPage is "location-details"
  if (currentPage === "location-details" && selectedLocation) {
    return (
      <LocationDetailsPage 
        onBack={() => {
          setCurrentPage("map");
          setSelectedLocation(null);
        }} 
        onNavigate={setCurrentPage}
        locationData={selectedLocation}
      />
    );
  }

  // Show Map page when currentPage is "map"
  if (currentPage === "map") {
    return (
      <CircularNetworkMapEnhanced
        onBack={() => setCurrentPage("home")} 
        onNavigate={setCurrentPage}
        onLocationSelect={(location) => {
          setSelectedLocation(location);
          setCurrentPage("location-details");
        }}
        onViewRecommendations={() => {
          // Reset other auto-triggers to ensure only recommendations show
          setAiAutoPrompt(undefined);
          setWasteDataSubmission(null);
          setShowRecommendations(true);
          setCurrentPage("ai-chat");
        }}
      />
    );
  }

  // Show Valorise page when currentPage is "valorise"
  if (currentPage === "valorise") {
    return (
      <ValorisePage 
        onBack={() => setCurrentPage("home")} 
        onNavigate={setCurrentPage}
        onViewRecommendations={() => {
          // Reset other auto-triggers to ensure only recommendations show
          setAiAutoPrompt(undefined);
          setWasteDataSubmission(null);
          setShowRecommendations(true);
          setCurrentPage("ai-chat");
        }}
      />
    );
  }

  // Show AI Assistant page when currentPage is "ai-assistant"
  if (currentPage === "ai-assistant") {
    return (
      <AIAssistantPage 
        onBack={() => setCurrentPage("valorise")} 
        onNavigate={setCurrentPage}
      />
    );
  }

  // Show AI Chat page when currentPage is "ai-chat"
  if (currentPage === "ai-chat") {
    return (
      <AIValorisationChatPage 
        onBack={() => {
          setCurrentPage("valorise");
          setWasteDataSubmission(null);
          setAiAutoPrompt(undefined);
          setShowRecommendations(false);
        }} 
        onNavigate={setCurrentPage}
        initialWasteData={wasteDataSubmission}
        autoPrompt={aiAutoPrompt}
        showInitialRecommendations={showRecommendations}
      />
    );
  }

  // Show Impact Details page when currentPage is "impact-details"
  if (currentPage === "impact-details") {
    return <ImpactDetailsPage onBack={() => setCurrentPage("home")} onNavigate={setCurrentPage} />;
  }

  // Show Notifications page when currentPage is "notifications"
  if (currentPage === "notifications") {
    return <NotificationsPage onBack={() => setCurrentPage("home")} onNavigate={setCurrentPage} />;
  }

  // Show Post Detail page when currentPage is "post-detail"
  if (currentPage === "post-detail" && selectedPost) {
    return (
      <PostDetailPage
        post={selectedPost}
        onBack={() => {
          setCurrentPage("home");
          setSelectedPost(null);
        }}
        onNavigate={setCurrentPage}
      />
    );
  }

  // Show Community Stories page when currentPage is "community-stories"
  if (currentPage === "community-stories") {
    return (
      <CommunityStoriesPage 
        onBack={() => setCurrentPage("community")} 
        onNavigate={setCurrentPage}
        onAIIdeas={() => {
          setAiAutoPrompt("Give me some ideas");
          setCurrentPage("valorise");
        }}
      />
    );
  }

  // Show Create Post page when currentPage is "create-post"
  if (currentPage === "create-post") {
    return <CreatePostPage onBack={() => setCurrentPage("community-stories")} onNavigate={setCurrentPage} />;
  }

  // Show Challenge Submission page when currentPage is "challenge-submission"
  if (currentPage === "challenge-submission") {
    return <ChallengeSubmissionPage onBack={() => setCurrentPage("home")} onNavigate={setCurrentPage} />;
  }

  // Show Discussion Forum page when currentPage is "discussion-forum"
  if (currentPage === "discussion-forum") {
    return <DiscussionForumPage onBack={() => setCurrentPage("community")} onNavigate={setCurrentPage} />;
  }

  // Show Shop page when currentPage is "shop"
  if (currentPage === "shop") {
    return (
      <ShopPage 
        onBack={() => setCurrentPage("home")} 
        onNavigate={setCurrentPage}
        onCheckout={(items) => {
          setCheckoutItems(items);
          setCurrentPage("checkout");
        }}
      />
    );
  }

  // Show Profile page when currentPage is "profile"
  if (currentPage === "profile") {
    return <ProfilePage onNavigate={setCurrentPage} />;
  }

  // Show Community page when currentPage is "community"
  if (currentPage === "community") {
    return <CommunityPage onNavigate={setCurrentPage} />;
  }

  // Show Checkout page when currentPage is "checkout"
  if (currentPage === "checkout") {
    return (
      <CheckoutPage
        onBack={() => setCurrentPage("shop")}
        onNavigate={setCurrentPage}
        cartItems={checkoutItems}
        onUpdateQuantity={(id, quantity) => {
          setCheckoutItems(checkoutItems.map(item =>
            item.id === id ? { ...item, quantity } : item
          ));
        }}
      />
    );
  }

  // Home page
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9F6] via-white to-[#F0F7F2] dark:from-[#1a2332] dark:via-[#1e2738] dark:to-[#1e2f1f] pb-20 transition-colors duration-300">
      {/* Mobile container */}
      <div className="max-w-md mx-auto min-h-screen">
        {/* Header - Reduced vertical spacing */}
        <div className="bg-gradient-to-r from-white via-white to-[#f0f7f2] dark:from-[#1a2332] dark:via-[#1e2738] dark:to-[#1e2f1f] backdrop-blur-md px-4 pt-4 pb-3 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-20 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <img
                src={cirvolaLogo}
                alt="Cirvola Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="relative hover:scale-110 transition-transform p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isDarkMode ? (
                  <Sun className="w-4.5 h-4.5 text-[#F6C83B]" />
                ) : (
                  <Moon className="w-4.5 h-4.5 text-[#1a2332]" />
                )}
              </button>
              <button 
                onClick={() => setCurrentPage("notifications")}
                className="relative hover:scale-110 transition-transform"
              >
                <Bell className="w-4.5 h-4.5 text-[#1a2332] dark:text-white" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#F6C83B] rounded-full ring-2 ring-white dark:ring-[#1a2332]"></div>
              </button>
              <button onClick={() => setCurrentPage("profile")} className="hover:scale-110 transition-transform">
                <User className="w-4.5 h-4.5 text-[#1a2332] dark:text-white" />
              </button>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-[17px] font-bold text-gray-900 dark:text-white mb-0.5 leading-tight">Welcome Back, Eco Explorer</h2>
            <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-tight">Turning food waste into worth, that's all</p>
          </div>
        </div>

        {/* Hero Section */}
        <CircularLivingHero
          onAddWaste={() => setShowAddWasteForm(true)}
          onShareStory={() => setCurrentPage("community-stories")}
        />

        {/* Add Waste Data Form Overlay */}
        <AddWasteDataForm
          isOpen={showAddWasteForm}
          onClose={() => setShowAddWasteForm(false)}
          onSubmit={(data) => {
            setWasteDataSubmission(data);
            setShowAddWasteForm(false);
            setCurrentPage("ai-chat");
          }}
        />

        {/* Main content with subtle dividers - Reduced spacing */}
        <div className="px-4 py-3 space-y-3">
          {/* Section 1: Circular Journey Tracker */}
          <CircularJourneyTracker />
          
          <div className="h-px bg-gradient-to-r from-transparent via-[#DDEBD1] to-transparent"></div>

          {/* Section 2: Impact Snapshot */}
          <ImpactSnapshot onViewDetails={() => setCurrentPage("impact-details")} />
          
          <div className="h-px bg-gradient-to-r from-transparent via-[#DDEBD1] dark:via-[#3d5a2d] to-transparent"></div>

          {/* Section 3: Waste Stream Map */}
          <WasteStreamMapEnhanced onViewAll={() => setCurrentPage("map")} />
          
          <div className="h-px bg-gradient-to-r from-transparent via-[#DDEBD1] dark:via-[#3d5a2d] to-transparent"></div>

          {/* Section 4: Community Valorisation Feed */}
          <CommunityValorisationFeed
            onViewAll={() => setCurrentPage("community-stories")}
            onPostClick={(story) => {
              setSelectedPost(story as Post);
              setCurrentPage("post-detail");
            }}
          />
          
          <div className="h-px bg-gradient-to-r from-transparent via-[#DDEBD1] dark:via-[#3d5a2d] to-transparent"></div>

          {/* Section 5: Weekly Challenge */}
          <WeeklyChallengeCard onAccept={() => setCurrentPage("challenge-submission")} />
          
          <div className="h-px bg-gradient-to-r from-transparent via-[#DDEBD1] dark:via-[#3d5a2d] to-transparent"></div>

          {/* Section 6: Footer CTA */}
          <FooterCTA
            onExploreShop={() => setCurrentPage("shop")}
            onJoinDiscussions={() => setCurrentPage("community")}
          />

          {/* Bottom spacing for navigation */}
          <div className="h-12"></div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activePage={currentPage} onNavigate={setCurrentPage} />
      </div>

      {/* Toaster for notifications */}
      <Toaster />

      {/* Styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
