import { ArrowLeft, Heart, MessageCircle, UserPlus, Award, TrendingUp, ShoppingBag, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";
import { BottomNavigation } from "./BottomNavigation";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface NotificationsPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "collaboration" | "achievement" | "system" | "shop" | "challenge";
  user?: {
    name: string;
    avatar: string;
  };
  image?: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    page: string;
  };
}

function NotificationItem({ notification, onNavigate }: { notification: Notification; onNavigate: (page: string) => void }) {
  const getIcon = () => {
    switch (notification.type) {
      case "like":
        return <Heart className="w-4 h-4 text-red-500 fill-red-500" />;
      case "comment":
        return <MessageCircle className="w-4 h-4 text-[#4FC3F7]" />;
      case "follow":
        return <UserPlus className="w-4 h-4 text-[#8BC34A]" />;
      case "collaboration":
        return <Users className="w-4 h-4 text-[#F6C83B]" />;
      case "achievement":
        return <Award className="w-4 h-4 text-[#F6C83B]" />;
      case "system":
        return <Sparkles className="w-4 h-4 text-[#1a2332]" />;
      case "shop":
        return <ShoppingBag className="w-4 h-4 text-[#8BC34A]" />;
      case "challenge":
        return <TrendingUp className="w-4 h-4 text-[#4FAE68]" />;
      default:
        return <Sparkles className="w-4 h-4 text-gray-500" />;
    }
  };

  const getIconBg = () => {
    switch (notification.type) {
      case "like":
        return "bg-red-50";
      case "comment":
        return "bg-blue-50";
      case "follow":
        return "bg-[#EAF6E3]";
      case "collaboration":
        return "bg-[#FFF9E6]";
      case "achievement":
        return "bg-[#FFF9E6]";
      case "system":
        return "bg-gray-50";
      case "shop":
        return "bg-[#EAF6E3]";
      case "challenge":
        return "bg-[#E8F5E9]";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
        notification.read ? "bg-white dark:bg-[#2d3a4d]" : "bg-[#F0F7F2] dark:bg-[#1e2f1f]"
      } hover:bg-gray-50 dark:hover:bg-gray-700`}
    >
      {/* Avatar or Icon */}
      {notification.user ? (
        <div className="relative flex-shrink-0">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <ImageWithFallback
              src={notification.user.avatar}
              alt={notification.user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full ${getIconBg()} border-2 border-white flex items-center justify-center shadow-sm`}>
            {getIcon()}
          </div>
        </div>
      ) : (
        <div className={`w-11 h-11 rounded-full ${getIconBg()} flex items-center justify-center flex-shrink-0`}>
          {getIcon()}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 dark:text-gray-100 leading-snug mb-1">
          {notification.user && (
            <span className="font-semibold">{notification.user.name} </span>
          )}
          <span className={notification.read ? "text-gray-600 dark:text-gray-400" : "text-gray-900 dark:text-gray-100"}>
            {notification.message}
          </span>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{notification.timestamp}</p>
        
        {notification.action && (
          <button
            onClick={() => onNavigate(notification.action!.page)}
            className="mt-2 text-xs text-[#1a2332] dark:text-[#6ba03f] font-semibold hover:text-[#2d3a4d] dark:hover:text-[#5a8c3a] transition-colors"
          >
            {notification.action.label}
          </button>
        )}
      </div>

      {/* Thumbnail Image */}
      {notification.image && (
        <div className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
          <ImageWithFallback
            src={notification.image}
            alt="notification"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Unread indicator */}
      {!notification.read && (
        <div className="w-2 h-2 bg-[#8BC34A] rounded-full flex-shrink-0 mt-2"></div>
      )}
    </motion.div>
  );
}

export function NotificationsPage({ onBack, onNavigate }: NotificationsPageProps) {
  const notifications: Notification[] = [
    // Today
    {
      id: "1",
      type: "like",
      user: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      },
      message: "liked your mango peel jam story",
      image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=150",
      timestamp: "5m ago",
      read: false,
    },
    {
      id: "2",
      type: "comment",
      user: {
        name: "Marcus Green",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      },
      message: "commented: 'This looks amazing! What temperature did you use?'",
      image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=150",
      timestamp: "12m ago",
      read: false,
    },
    {
      id: "3",
      type: "achievement",
      message: "🎉 You've unlocked the 'Waste Warrior' badge! You've diverted 5kg of food waste.",
      timestamp: "1h ago",
      read: false,
      action: {
        label: "View achievement",
        page: "profile",
      },
    },
    {
      id: "4",
      type: "follow",
      user: {
        name: "Emma Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      },
      message: "started following you",
      timestamp: "2h ago",
      read: false,
    },
    {
      id: "5",
      type: "collaboration",
      user: {
        name: "GreenCycle Hub",
        avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150",
      },
      message: "wants to collaborate on your coffee grounds project",
      timestamp: "3h ago",
      read: false,
      action: {
        label: "View request",
        page: "community",
      },
    },
    {
      id: "6",
      type: "like",
      user: {
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      },
      message: "and 12 others liked your post",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150",
      timestamp: "4h ago",
      read: true,
    },
    
    // This Week
    {
      id: "7",
      type: "shop",
      message: "Your order of Cocoa Husk Pudding has been shipped! 📦",
      image: "https://images.unsplash.com/photo-1673551491291-5b17d2842988?w=150",
      timestamp: "Yesterday",
      read: true,
      action: {
        label: "Track order",
        page: "profile",
      },
    },
    {
      id: "8",
      type: "challenge",
      message: "New Weekly Challenge: 'Zero-Waste Weekend' - Join now and win rewards!",
      timestamp: "2 days ago",
      read: true,
      action: {
        label: "View challenge",
        page: "home",
      },
    },
    {
      id: "9",
      type: "comment",
      user: {
        name: "Lisa Wang",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      },
      message: "replied to your comment: 'I tried this recipe and it turned out great!'",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=150",
      timestamp: "3 days ago",
      read: true,
    },
    {
      id: "10",
      type: "system",
      message: "Your impact report is ready! You've saved 124g of CO₂ this week.",
      timestamp: "4 days ago",
      read: true,
      action: {
        label: "View report",
        page: "impact-details",
      },
    },
    {
      id: "11",
      type: "like",
      user: {
        name: "David Park",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
      },
      message: "liked your banana peel leather tutorial",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=150",
      timestamp: "5 days ago",
      read: true,
    },
    
    // Earlier
    {
      id: "12",
      type: "collaboration",
      user: {
        name: "Urban Farms Co.",
        avatar: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=150",
      },
      message: "accepted your collaboration request for compost partnership",
      timestamp: "1 week ago",
      read: true,
      action: {
        label: "View details",
        page: "community",
      },
    },
    {
      id: "13",
      type: "achievement",
      message: "🏆 Milestone reached! You've helped 18 community members with your valorisation ideas.",
      timestamp: "1 week ago",
      read: true,
    },
    {
      id: "14",
      type: "follow",
      user: {
        name: "Rachel Kim",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
      },
      message: "started following you",
      timestamp: "2 weeks ago",
      read: true,
    },
  ];

  // Group notifications by time
  const todayNotifications = notifications.filter((n) => 
    n.timestamp.includes("m ago") || n.timestamp.includes("h ago")
  );
  const thisWeekNotifications = notifications.filter((n) => 
    n.timestamp.includes("Yesterday") || n.timestamp.includes("days ago")
  );
  const earlierNotifications = notifications.filter((n) => 
    n.timestamp.includes("week ago")
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9F6] dark:from-[#1a2332] to-white dark:to-[#1e2738] pb-24 transition-colors duration-300">
      <div className="max-w-md mx-auto min-h-screen">
        {/* Header */}
        <div className="bg-white dark:bg-[#1a2332] px-5 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-20 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <div className="flex-1">
              <h2 className="text-gray-900 dark:text-white">Notifications</h2>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{unreadCount} unread</p>
              )}
            </div>
            {unreadCount > 0 && (
              <button className="text-sm text-[#8BC34A] dark:text-[#6ba03f] hover:text-[#7CB342] dark:hover:text-[#5a8c3a] font-semibold transition-colors">
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="px-5 py-5">
          {/* Today */}
          {todayNotifications.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide font-semibold">Today</h3>
              <div className="space-y-2">
                {todayNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </div>
          )}

          {/* This Week */}
          {thisWeekNotifications.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide font-semibold">This Week</h3>
              <div className="space-y-2">
                {thisWeekNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Earlier */}
          {earlierNotifications.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide font-semibold">Earlier</h3>
              <div className="space-y-2">
                {earlierNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {notifications.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-[#EAF6E3] dark:bg-[#2a3f2b] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-[#8BC34A] dark:text-[#6ba03f]" />
              </div>
              <h3 className="text-gray-900 dark:text-white mb-2">No notifications yet</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                When you get notifications, they'll show up here
              </p>
            </div>
          )}

          {/* Bottom spacing */}
          <div className="h-8"></div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activePage="home" onNavigate={onNavigate} />
      </div>
    </div>
  );
}
