import React, { useState } from "react";
import { useCart } from "../store/CartContext";
import { Link, useNavigate } from "react-router";
import { ShieldCheck, MapPin, CreditCard, ChevronLeft, CheckCircle, Truck, PackageCheck, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

export const Checkout: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const deliveryFee = 1500;
  const grandTotal = totalPrice + deliveryFee + (totalPrice * 0.075);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#047857", "#f59e0b", "#ffffff"]
    });
    setTimeout(() => {
      clearCart();
      navigate("/");
    }, 5000);
  };

  if (cart.length === 0 && !isOrdered) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl mb-4">Your cart is empty</h2>
        <Link to="/products" className="text-emerald-700 hover:underline">
          Go back to shop
        </Link>
      </div>
    );
  }

  if (isOrdered) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] border-2 border-emerald-100 shadow-2xl flex flex-col items-center"
        >
          <div className="bg-emerald-100 p-6 rounded-full mb-8">
            <CheckCircle className="w-16 h-16 text-emerald-700" />
          </div>
          <h1 className="text-4xl text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-10 text-lg leading-relaxed">
            Your fresh ingredients are being prepared! We'll notify you when they're on the way.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-12">
            <div className="bg-emerald-50 p-4 rounded-2xl flex flex-col items-center">
              <PackageCheck className="w-6 h-6 text-emerald-700 mb-2" />
              <span className="text-xs text-gray-900">Order Confirmed</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center">
              <Truck className="w-6 h-6 text-gray-400 mb-2" />
              <span className="text-xs text-gray-400">On its way</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center">
              <MapPin className="w-6 h-6 text-gray-400 mb-2" />
              <span className="text-xs text-gray-400">Delivered</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/cart" className="inline-flex items-center space-x-2 text-gray-600 hover:text-emerald-700 mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        <span>Return to cart</span>
      </Link>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <h1 className="text-4xl text-gray-900 mb-12">Checkout</h1>
          
          <form onSubmit={handleOrder} className="space-y-12">
            {/* Delivery Details */}
            <section className="bg-white p-8 rounded-[2.5rem] border-2 border-emerald-100 shadow-sm">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-emerald-50 p-2.5 rounded-xl">
                  <MapPin className="w-6 h-6 text-emerald-700" />
                </div>
                <h2 className="text-2xl text-gray-900">Delivery Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase tracking-widest px-1">Full Name</label>
                  <input type="text" required placeholder="Adebayo Oluwaseun" className="w-full bg-emerald-50 border-2 border-emerald-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-gray-900" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase tracking-widest px-1">Phone Number</label>
                  <input type="tel" required placeholder="+234 800 000 0000" className="w-full bg-emerald-50 border-2 border-emerald-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-gray-900" />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs text-gray-500 uppercase tracking-widest px-1">Delivery Address</label>
                  <input type="text" required placeholder="Street address, Apartment, Building" className="w-full bg-emerald-50 border-2 border-emerald-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-gray-900" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase tracking-widest px-1">City</label>
                  <select className="w-full bg-emerald-50 border-2 border-emerald-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-gray-900">
                    <option>Lagos</option>
                    <option>Abuja</option>
                    <option>Port Harcourt</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase tracking-widest px-1">State</label>
                  <input type="text" required placeholder="Lagos State" className="w-full bg-emerald-50 border-2 border-emerald-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-gray-900" />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white p-8 rounded-[2.5rem] border-2 border-emerald-100 shadow-sm">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-emerald-50 p-2.5 rounded-xl">
                  <CreditCard className="w-6 h-6 text-emerald-700" />
                </div>
                <h2 className="text-2xl text-gray-900">Payment Method</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "card", name: "Credit / Debit Card", icon: CreditCard },
                  { id: "transfer", name: "Bank Transfer", icon: ShieldCheck },
                  { id: "mobile", name: "USSD / Mobile Money", icon: Smartphone },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all ${
                      paymentMethod === method.id
                        ? "border-emerald-700 bg-emerald-50 text-emerald-900 shadow-lg shadow-emerald-100"
                        : "border-emerald-100 bg-white text-gray-600 hover:border-emerald-200"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <method.icon className="w-6 h-6" />
                      <span>{method.name}</span>
                    </div>
                    {paymentMethod === method.id && <CheckCircle className="w-5 h-5 fill-emerald-700 text-white" />}
                  </button>
                ))}
              </div>
            </section>

            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-6 rounded-3xl shadow-2xl shadow-emerald-200 transition-all text-xl hover:scale-[1.01] active:scale-[0.99]"
            >
              Pay {formatPrice(grandTotal)}
            </button>
          </form>
        </div>

        {/* Order Review */}
        <div className="w-full lg:w-[450px]">
          <div className="bg-white p-10 rounded-[3rem] border-2 border-emerald-100 shadow-2xl sticky top-24">
            <h2 className="text-2xl text-gray-900 mb-8">Order Review</h2>
            <div className="max-h-[300px] overflow-y-auto pr-4 mb-8 space-y-6 no-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-emerald-50 rounded-xl overflow-hidden shrink-0 border-2 border-emerald-100 shadow-inner">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 leading-snug">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-emerald-100 mb-10">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Delivery Fee</span>
                <span className="text-gray-900">{formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">VAT (7.5%)</span>
                <span className="text-gray-900">{formatPrice(totalPrice * 0.075)}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-emerald-50 mt-4">
                <span className="text-xl text-gray-900">Grand Total</span>
                <span className="text-2xl text-emerald-700">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div className="bg-emerald-50 p-6 rounded-3xl flex items-start space-x-4">
               <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
               <p className="text-xs text-emerald-900 leading-relaxed">
                  Your payment is processed securely by Paystack. We do not store your card details on our servers.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};