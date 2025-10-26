import { ArrowLeft, Plus, Minus, ChevronRight, Check, CreditCard, Smartphone, Building2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CheckoutPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  source: string;
  wasteOffset: number; // in kg
}

export function CheckoutPage({ onBack, onNavigate, cartItems, onUpdateQuantity }: CheckoutPageProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express" | "pickup">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paynow" | "bank">("card");
  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    address: "",
    postalCode: "",
    contactNumber: "",
  });

  const deliveryFees = {
    standard: 2.00,
    express: 5.00,
    pickup: 0.00,
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryFees[deliveryMethod];
  const total = subtotal + deliveryFee;
  const totalWasteOffset = cartItems.reduce((sum, item) => sum + item.wasteOffset * item.quantity, 0);

  const handleConfirmPayment = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      // Navigate to success page or home
      onNavigate("home");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9F6] to-white pb-24">
      <div className="max-w-md mx-auto min-h-screen">
        {/* Header */}
        <div className="bg-white px-4 pt-6 pb-3 border-b border-gray-100 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h2 className="text-gray-900">Checkout 🛒</h2>
              <p className="text-xs text-gray-600">Review and confirm your purchase</p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-[#8BC34A] flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs text-gray-500 hidden sm:inline">Cart</span>
            </div>
            <div className="flex-1 h-0.5 bg-[#8BC34A] mx-1"></div>
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-[#8BC34A] flex items-center justify-center">
                <span className="text-xs text-white">2</span>
              </div>
              <span className="text-xs text-[#8BC34A] hidden sm:inline">Checkout</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-1"></div>
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-400">3</span>
              </div>
              <span className="text-xs text-gray-400 hidden sm:inline">Done</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto">
          <div className="px-4 py-4 space-y-4">
            {/* Order Summary Section */}
            <div>
              <h3 className="text-sm text-gray-700 mb-2">📦 Order Summary</h3>
              <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 space-y-3">
                {cartItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-start gap-2">
                      {/* Product Image */}
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs text-gray-900 mb-0.5 line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-gray-500 mb-1">Made from {item.source}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-gray-50 rounded-md px-1.5 py-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-5 h-5 rounded bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Minus className="w-2.5 h-2.5 text-gray-600" />
                            </button>
                            <span className="text-xs text-gray-900 w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-5 h-5 rounded bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Plus className="w-2.5 h-2.5 text-gray-600" />
                            </button>
                          </div>
                          <span className="text-xs text-gray-500">@ ${item.price.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    {index < cartItems.length - 1 && <div className="h-px bg-gray-100 mt-2"></div>}
                  </div>
                ))}

                {/* Waste Offset Summary */}
                <div className="bg-[#EAF6E3] rounded-lg p-2 mt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">♻️</span>
                    <p className="text-xs text-gray-700">
                      <span className="text-[#3C6E47]">{totalWasteOffset.toFixed(1)}kg</span> waste reused
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Details Section */}
            <div>
              <h3 className="text-sm text-gray-700 mb-2">🏠 Delivery Information</h3>
              <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 space-y-3">
                {/* Use Saved Address Toggle */}
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <span className="text-xs text-gray-700">Use Saved Address</span>
                  <button
                    onClick={() => setUseSavedAddress(!useSavedAddress)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      useSavedAddress ? "bg-[#8BC34A]" : "bg-gray-300"
                    }`}
                  >
                    <motion.div
                      animate={{ x: useSavedAddress ? 20 : 2 }}
                      className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={deliveryInfo.fullName}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, fullName: e.target.value })}
                    disabled={useSavedAddress}
                    className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-900 placeholder:text-gray-400 disabled:opacity-50"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={deliveryInfo.address}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                    disabled={useSavedAddress}
                    className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-900 placeholder:text-gray-400 disabled:opacity-50"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={deliveryInfo.postalCode}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, postalCode: e.target.value })}
                      disabled={useSavedAddress}
                      className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-900 placeholder:text-gray-400 disabled:opacity-50"
                    />
                    <input
                      type="text"
                      placeholder="Contact Number"
                      value={deliveryInfo.contactNumber}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, contactNumber: e.target.value })}
                      disabled={useSavedAddress}
                      className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-900 placeholder:text-gray-400 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Delivery Method */}
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-700 mb-2">Delivery Method</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => setDeliveryMethod("standard")}
                      className={`px-2 py-2 rounded-lg border-2 transition-all ${
                        deliveryMethod === "standard"
                          ? "border-[#8BC34A] bg-[#EAF6E3]"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="text-base mb-0.5">🏍️</div>
                      <p className="text-xs text-gray-900">Standard</p>
                      <p className="text-xs text-gray-500">3-5 days</p>
                    </button>
                    <button
                      onClick={() => setDeliveryMethod("express")}
                      className={`px-2 py-2 rounded-lg border-2 transition-all ${
                        deliveryMethod === "express"
                          ? "border-[#8BC34A] bg-[#EAF6E3]"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="text-base mb-0.5">⚡</div>
                      <p className="text-xs text-gray-900">Express</p>
                      <p className="text-xs text-gray-500">Next-day</p>
                    </button>
                    <button
                      onClick={() => setDeliveryMethod("pickup")}
                      className={`px-2 py-2 rounded-lg border-2 transition-all ${
                        deliveryMethod === "pickup"
                          ? "border-[#8BC34A] bg-[#EAF6E3]"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="text-base mb-0.5">🚶</div>
                      <p className="text-xs text-gray-900">Pickup</p>
                      <p className="text-xs text-gray-500">Free</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div>
              <h3 className="text-sm text-gray-700 mb-2">💳 Payment Method</h3>
              <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 space-y-2">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full flex items-center justify-between p-2 rounded-lg border-2 transition-all ${
                    paymentMethod === "card"
                      ? "border-[#8BC34A] bg-[#EAF6E3]"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-600" />
                    <span className="text-xs text-gray-900">Credit / Debit Card</span>
                  </div>
                  {paymentMethod === "card" && (
                    <Check className="w-4 h-4 text-[#8BC34A]" />
                  )}
                </button>

                <button
                  onClick={() => setPaymentMethod("paynow")}
                  className={`w-full flex items-center justify-between p-2 rounded-lg border-2 transition-all ${
                    paymentMethod === "paynow"
                      ? "border-[#8BC34A] bg-[#EAF6E3]"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-gray-600" />
                    <span className="text-xs text-gray-900">PayNow / QR Payment</span>
                  </div>
                  {paymentMethod === "paynow" && (
                    <Check className="w-4 h-4 text-[#8BC34A]" />
                  )}
                </button>

                <button
                  onClick={() => setPaymentMethod("bank")}
                  className={`w-full flex items-center justify-between p-2 rounded-lg border-2 transition-all ${
                    paymentMethod === "bank"
                      ? "border-[#8BC34A] bg-[#EAF6E3]"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-600" />
                    <span className="text-xs text-gray-900">Bank Transfer</span>
                  </div>
                  {paymentMethod === "bank" && (
                    <Check className="w-4 h-4 text-[#8BC34A]" />
                  )}
                </button>

                {paymentMethod === "card" && (
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-1.5">Saved Payment</p>
                    <div className="bg-gray-50 rounded-lg p-2 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-600" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-900">•••• •••• •••• 4242</p>
                        <p className="text-xs text-gray-500">Visa - Expires 12/25</p>
                      </div>
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Impact Summary Widget */}
            <div className="bg-gradient-to-br from-[#3C6E47] to-[#4FAE68] rounded-xl p-3 text-white shadow-md">
              <div className="flex items-start gap-2">
                <span className="text-xl">🌍</span>
                <div className="flex-1">
                  <p className="text-xs text-white/90 mb-1">
                    This purchase helps divert <span className="text-white font-semibold">{totalWasteOffset.toFixed(1)}kg</span> of food waste from landfill!
                  </p>
                  <p className="text-xs text-white">
                    Keep up the good work, Circular Chef! 💚
                  </p>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900 font-semibold">${deliveryFee.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="w-full text-left text-xs text-[#8BC34A] hover:text-[#7CB342] flex items-center gap-1"
                >
                  {showBreakdown ? "Hide" : "View"} Itemized Breakdown
                  <ChevronRight className={`w-2.5 h-2.5 transition-transform ${showBreakdown ? "rotate-90" : ""}`} />
                </button>

                <AnimatePresence>
                  {showBreakdown && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-1 overflow-hidden"
                    >
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-xs text-gray-500 pl-2">
                          <span className="line-clamp-1">{item.name} × {item.quantity}</span>
                          <span className="flex-shrink-0 ml-2">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="h-px bg-gray-200"></div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">Total</span>
                  <span className="text-lg text-[#3C6E47] font-semibold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Checkout Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 shadow-lg z-30">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleConfirmPayment}
              className="w-full bg-gradient-to-r from-[#1a2332] to-[#2d3a4d] text-white py-3 rounded-xl hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <span className="text-sm">Confirm & Pay ${total.toFixed(2)}</span>
            </button>
            <p className="text-xs text-gray-500 text-center mt-1.5">
              By confirming, you agree to Cirvola's eco-commerce terms
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white rounded-2xl p-6 mx-4 max-w-sm text-center"
            >
              <div className="w-16 h-16 bg-[#EAF6E3] rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-[#8BC34A]" />
              </div>
              <h3 className="text-sm text-gray-900 mb-2">Order Confirmed! 🎉</h3>
              <p className="text-xs text-gray-600 mb-4">
                Your order has been placed successfully. You've saved {totalWasteOffset.toFixed(1)}kg of food waste!
              </p>
              <div className="text-xs text-gray-500">
                Redirecting to home...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styles */}
      <style>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
