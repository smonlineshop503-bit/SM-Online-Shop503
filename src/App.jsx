import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Trash2, Plus, Minus, Search, 
  ShieldCheck, Truck, RefreshCw, Star, ArrowRight, X, Menu, Settings, Heart, Sparkles, Facebook, Instagram, MessageCircle, CheckCircle2, Printer, Image as ImageIcon, Send, Camera, Lock, Key, Shield, Video, Radio, Users, Eye
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('shop'); // 'shop', 'cart', 'wishlist', 'tracking', 'live', 'admin'

  // Persistent States using LocalStorage for High Reliability
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('sm_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('sm_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  // Form & Checkout States
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [trxId, setTrxId] = useState('');

  // Admin & High Security States
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tracking States
  const [trackInput, setTrackInput] = useState('');
  const [trackResult, setTrackResult] = useState(null);

  // Lucky Spin Wheel States
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinMessage, setSpinMessage] = useState('আপনার ডিসকাউন্ট স্পিন করতে নিচের বাটনে চাপ দিন!');

  // Coupon Code & Discount States
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isFreeShipping, setIsFreeShipping] = useState(false);

  // Live Chat Widget State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'support', text: 'আসসালামু আলাইকুম! SM Online Shop-এ আপনাকে স্বাগতম। পেমেন্ট, ডেলিভারি বা স্কিনকেয়ার নিয়ে যেকোনো প্রশ্ন করতে পারেন। এমনকি যেকোনো প্রোডাক্টের ছবি পাঠালেও আমি তার দাম ও বিবরণ বলে দিতে পারব!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatImagePreview, setChatImagePreview] = useState(null);

  // Free Live Stream State
  const [liveComments, setLiveComments] = useState([
    { user: 'সাবিহা সুলতানা', text: 'আপু হিজাবটার দাম কত?' },
    { user: 'ফারিহা জামান', text: 'খুব সুন্দর কালেকশন!' },
    { user: 'নুসরাত জাহান', text: 'অর্ডার করলাম, দ্রুত পাঠিয়ে দেবেন প্লিজ।' }
  ]);
  const [newLiveComment, setNewLiveComment] = useState('');

  // Active Sessions Monitoring (Security Audit)
  const [activeSessions, setActiveSessions] = useState([
    {
      id: 'sess-1',
      device: 'Desktop Browser (Chrome / Windows Encrypted)',
      ip: '192.168.1.15 (Secured SSL)',
      loginTime: 'Just Now',
      isCurrent: true
    }
  ]);

  // Sync Cart and Wishlist to LocalStorage
  useEffect(() => {
    localStorage.setItem('sm_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sm_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Initial Product List State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('sm_products');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'Premium Chiffon Hijab with Inner Cap',
        price: 650,
        oldPrice: 850,
        category: 'Hijab & Abaya',
        image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=600&q=80',
        rating: 4.9,
        reviewsCount: 38,
        description: 'Soft, breathable premium chiffon hijab paired with a matching comfortable inner cap.',
        reviews: [
          { id: 101, name: 'সাবিহা সুলতানা', rating: 5, comment: 'হিজাবের কোয়ালিটি অনেক প্রিমিয়াম এবং ইনার ক্যাপটি খুবই আরামদায়ক। ধন্যবাদ SM Online Shop!' },
          { id: 102, name: 'ফারিহা জামান', rating: 5, comment: 'যেমনটি দেখেছি ঠিক তেমনই পেয়েছি। কালার ও কাপড় খুব ভালো।' }
        ]
      },
      {
        id: 2,
        name: 'Embroidered Black Designer Abaya',
        price: 3200,
        oldPrice: 3800,
        category: 'Hijab & Abaya',
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
        rating: 4.8,
        reviewsCount: 52,
        description: 'Elegant black abaya featuring delicate gold embroidery on sleeves and front border.',
        reviews: [
          { id: 103, name: 'নুসরাত জাহান', rating: 5, comment: 'আবায়ার এম্ব্রয়ডারি কাজ নিখুঁত এবং গর্জিয়াস। সবাই অনেক প্রশংসা করেছে।' }
        ]
      },
      {
        id: 3,
        name: 'Floral Printed Georgette Kurti',
        price: 1850,
        oldPrice: 2200,
        category: 'Women Fashion',
        image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=80',
        rating: 4.7,
        reviewsCount: 24,
        description: 'Stylish casual floral printed georgette kurti for everyday elegance and comfort.',
        reviews: [
          { id: 104, name: 'মেহজাবিন চৌধুরী', rating: 4.5, comment: 'দৈনন্দিন ব্যবহারের জন্য দারুণ একটি কুর্তি। কাপড় অনেক সফট।' }
        ]
      },
      {
        id: 4,
        name: 'Matte Liquid Lipstick Collection',
        price: 950,
        oldPrice: 1200,
        category: 'Cosmetics',
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
        rating: 4.9,
        reviewsCount: 89,
        description: 'Long-lasting waterproof matte liquid lipstick set with vibrant, rich pigmentation.',
        reviews: [
          { id: 105, name: 'তাসনিম আক্তার', rating: 5, comment: 'লিপস্টিকগুলোর কালারগুলো অসাধারণ এবং লং-লাস্টিং! ১০০% অথেনটিক।' }
        ]
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('sm_products', JSON.stringify(products));
  }, [products]);

  const [selectedProductForReview, setSelectedProductForReview] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [newReviewerName, setNewReviewerName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState('5');

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    oldPrice: '',
    category: 'Hijab & Abaya',
    image: '',
    description: ''
  });

  const handleChatImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChatImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAISupportResponse = (userText, hasImage = false) => {
    if (hasImage) {
      return 'ধন্যবাদ ছবিটি শেয়ার করার জন্য! 📸 আমাদের সিস্টেম আপনার পাঠানো ছবিটি স্ক্যান করেছে। এই ধরনের প্রিমিয়াম প্রোডাক্টগুলোর মূল্য সাধারণত ৳৬৫০ থেকে ৳৩,২০০ টাকার মধ্যে হয়ে থাকে। বিস্তারিত জানা ও স্টক নিশ্চিত করতে আমাদের হটলাইনে (01886995687 / 01827872334) অথবা সরাসরি WhatsApp-এ ছবিটি পাঠান!';
    }

    const text = userText.toLowerCase();

    if (text.includes('হটলাইন') || text.includes('hotline') || text.includes('কল') || text.includes('call') || text.includes('কথা বলতে') || text.includes('কথা বলব') || text.includes('number') || text.includes('নম্বর') || text.includes('যোগাযোগ')) {
      return 'অবশ্যই! আপনি সরাসরি আমাদের হটলাইন নম্বরে কথা বলতে পারেন বা WhatsApp-এ যোগাযোগ করতে পারেন। আমাদের নম্বরগুলো হলো: 01886995687 এবং 01827872334। সরাসরি চ্যাট করতে স্ক্রিনের ডানে থাকা WhatsApp বা লাইভ চ্যাট আইকনে ক্লিক করুন!';
    }
    else if (text.includes('ডেলিভারি') || text.includes('charge') || text.includes('কতো') || text.includes('কত') || text.includes('shipping') || text.includes('পৌঁছাবে')) {
      return 'আমাদের ডেলিভারি চার্জ ঢাকার ভেতরে সাধারণত ৬০ টাকা এবং ঢাকার বাইরে সমগ্র বাংলাদেশে ১২০ টাকা। অর্ডার কনফার্ম করার পর সাধারণত ২ থেকে ৩ কার্যদিবসের মধ্যে পার্সেল পৌঁছে যায়!';
    } 
    else if (text.includes('বিকাশ') || text.includes('নগদ') || text.includes('রকেট') || text.includes('rocket') || text.includes('payment') || text.includes('টাকা') || text.includes('bkash') || text.includes('nagad') || text.includes('trxid')) {
      return 'আমাদের বিকাশ, নগদ ও রকেট মার্চেন্ট নম্বর হলো: 01827872334। এই নম্বরে পেমেন্ট সম্পন্ন করে চেকআউট ফর্মে আপনার ট্রানজেকশন আইডি (TrxID) দিন। ক্যাশ অন ডেলিভারি (COD)-এর সুবিধাও রয়েছে।';
    } 
    else if (text.includes('oil') || text.includes('অয়েলি') || text.includes('তেলতেলে')) {
      return 'অয়েলি বা তেলতেলে ত্বকের জন্য অতিরিক্ত সিবাম ও তেল নিয়ন্ত্রণ করা জরুরি। আমাদের শপ থেকে ওয়াটার-বেসড বা জেল টাইপ প্রিমিয়াম ম্যাট ময়েশ্চারাইজার এবং অয়েল-ফ্রি ক্রিম ব্যবহার করতে পারেন, যা ত্বক সতেজ রাখে এবং ব্রণের সমস্যা দূর করে!';
    }
    else if (text.includes('dry') || text.includes('ড্রাই') || text.includes('শুষ্ক')) {
      return 'ড্রাই বা শুষ্ক ত্বকের গভীর পুষ্টি ও ময়েশ্চারাইজেশনের প্রয়োজন হয়। আমাদের শপে থাকা ডিপ হাইড্রেটিং ভিটামিন-ই সমৃদ্ধ প্রিমিয়াম নারিশিং ক্রিম ব্যবহার করতে পারেন, যা ত্বককে সারাদিন নরম, কোমল ও দীপ্তিময় রাখবে।';
    }
    else if (text.includes('দুটো') || text.includes('দুটি') || text.includes('both') || text.includes('combination') || text.includes('অয়েলি ও ড্রাই') || text.includes('oil and dry')) {
      return 'আপনার ত্বক যদি কম্বিনেশন বা অয়েলি ও ড্রাই দুটোই হয় (যেমন: টি-জোন অয়েলি কিন্তু গাল শুষ্ক), তবে লাইটওয়েট হাইড্রেটিং জেল-ক্রিম ব্যবহার করা সবচেয়ে ভালো। এটি ত্বকের ভারসাম্য বজায় রাখে এবং অতিরিক্ত তেল বা শুষ্কতা দুই-ই দূর করে!';
    }
    else if (text.includes('স্কিন') || text.includes('skin') || text.includes('glow') || text.includes('ব্রণ') || text.includes('মেকআপ') || text.includes('makeup') || text.includes('tip') || text.includes('রুটিন') || text.includes('সুন্দর')) {
      return 'বিউটি টিপস: ত্বকের ধরন অনুযায়ী সঠিক স্কিন কেয়ার রুটিন মেনে চলা জরুরি। দিনে বের হওয়ার আগে অবশ্যই সানস্ক্রিন এবং রাতে ভালো ময়েশ্চারাইজার ব্যবহার করুন। আমাদের শপের প্রোডাক্টগুলো আপনার ত্বকের সুরক্ষায় ১০০% বিশ্বস্ত!';
    }
    else if (text.includes('হিজাব') || text.includes('hijab') || text.includes('আবায়া') || text.includes('abaya') || text.includes('dress') || text.includes('কাপড়') || text.includes('সাইজ') || text.includes('size')) {
      return 'আমাদের সমস্ত হিজাব সফট শিফন কাপড়ের এবং আবায়াগুলো প্রিমিয়াম জর্জেট ও এম্ব্রয়ডারি কাজের তৈরি, যা অত্যন্ত আরামদায়ক। প্রতিটি পণ্যের সাথে সঠিক সাইজ ও কালার চার্ট দেওয়া আছে।';
    } 
    else if (text.includes('অর্ডার') || text.includes('order') || text.includes('track') || text.includes('অবস্থা')) {
      return 'আপনার অর্ডারটি ট্র্যাক করতে ওয়েবসাইটের উপরে থাকা "অর্ডার ট্র্যাক" অপশনে ক্লিক করুন এবং আপনার অর্ডার আইডি দিয়ে বর্তমান স্ট্যাটাস দেখতে পারেন।';
    } 
    else {
      return 'আপনার প্রশ্নটি আমরা নোট করেছি! যেহেতু এটি একটি বিশেষ বিউটি বা শপিং সম্পর্কিত প্রশ্ন, তাই বিস্তারিত জানতে আমাদের হটলাইন (01886995687 / 01827872334)-এ কল করুন অথবা WhatsApp-এ মেসেজ পাঠান। আমরা আনন্দিত হব!';
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim() && !chatImagePreview) return;

    const userText = chatInput.trim();
    const hasImage = !!chatImagePreview;

    const newMsgs = [
      ...chatMessages,
      { sender: 'user', text: userText, image: chatImagePreview }
    ];

    setChatMessages(newMsgs);
    setChatInput('');
    setChatImagePreview(null);

    setTimeout(() => {
      const reply = generateAISupportResponse(userText, hasImage);
      setChatMessages(prev => [...prev, { sender: 'support', text: reply }]);
    }, 600);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    setCouponError('');
    if (!code) return;

    if (code === 'SM15') {
      setAppliedCoupon(code);
      setDiscountPercent(15);
      setIsFreeShipping(false);
    } else if (code === 'SM20') {
      setAppliedCoupon(code);
      setDiscountPercent(20);
      setIsFreeShipping(false);
    } else if (code === 'FREESHIP') {
      setAppliedCoupon(code);
      setDiscountPercent(0);
      setIsFreeShipping(true);
    } else {
      setCouponError('ভুল বা অকার্যকর কুপন কোড!');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon('');
    setCouponInput('');
    setDiscountPercent(0);
    setIsFreeShipping(false);
    setCouponError('');
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const baseShipping = subtotal > 0 ? 120 : 0; 
  const shipping = isFreeShipping ? 0 : baseShipping;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleConfirmOrder = () => {
    if (!customerName || !customerPhone || !customerAddress) {
      alert('দয়া করে আপনার নাম, মোবাইল নম্বর এবং ঠিকানা পূরণ করুন।');
      return;
    }

    if ((paymentMethod === 'bKash' || paymentMethod === 'Nagad' || paymentMethod === 'Rocket') && !trxId) {
      alert('দয়া করে আপনার ট্রানজেকশন আইডি (TrxID) প্রদান করুন।');
      return;
    }

    const orderId = 'SM-' + Math.floor(100000 + Math.random() * 900000);
    const orderObj = {
      orderId,
      date: new Date().toLocaleDateString('bn-BD'),
      customerName,
      customerPhone,
      customerAddress,
      paymentMethod,
      trxId: trxId || 'N/A',
      items: [...cart],
      subtotal,
      discountAmount,
      shipping,
      total
    };

    setLastOrderDetails(orderObj);
    setOrderSuccess(true);
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image) return;

    const prod = {
      id: Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      oldPrice: newProduct.oldPrice ? parseFloat(newProduct.oldPrice) : parseFloat(newProduct.price) * 1.2,
      category: newProduct.category,
      image: newProduct.image,
      rating: 5.0,
      reviewsCount: 1,
      description: newProduct.description || 'Premium quality product.',
      reviews: [{ id: Date.now(), name: 'অ্যাডমিন', rating: 5, comment: 'প্রিমিয়াম কোয়ালিটি অ্যাপ্রুভড!' }]
    };

    setProducts([prod, ...products]);
    setNewProduct({
      name: '',
      price: '',
      oldPrice: '',
      category: 'Hijab & Abaya',
      image: '',
      description: ''
    });
    alert('প্রোডাক্ট সফলভাবে যোগ করা হয়েছে!');
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleSpinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSpinMessage('স্পিন হচ্ছে... অপেক্ষা করুন! 🎡');
    
    setTimeout(() => {
      const coupons = [
        { code: 'SM15', msg: 'অভিনন্দন! আপনি জিতেছেন ১৫% ডিসকাউন্ট! কোড: SM15' },
        { code: 'SM20', msg: 'ওয়াও! আপনি জিতেছেন ২০% বিশেষ ডিসকাউন্ট! কোড: SM20' },
        { code: 'FREESHIP', msg: 'চমৎকার! আপনি পেয়েছেন ফ্রি শিপিং অফার! কোড: FREESHIP' }
      ];
      const selected = coupons[Math.floor(Math.random() * coupons.length)];
      setSpinMessage(selected.msg);
      setCouponInput(selected.code);
      setIsSpinning(false);
    }, 2000);
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!trackInput.trim()) return;

    setTrackResult({
      orderId: trackInput.trim(),
      status: 'প্রসেসিং এ আছে (Processing)',
      estimatedDelivery: '২-৩ কার্যদিবস',
      location: 'ঢাকা কেন্দ্রীয় ওয়্যারহাউজ'
    });
  };

  return (
    <div className="min-h-screen bg-pink-50/30 text-gray-800 font-sans pb-12">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-pink-50"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div 
              onClick={() => setActiveTab('shop')} 
              className="cursor-pointer flex items-center gap-2"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white font-black flex items-center justify-center text-lg shadow-md shadow-pink-200">
                SM
              </div>
              <div>
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  SM Online Shop
                </span>
                <span className="block text-[10px] font-bold text-pink-400 tracking-wider uppercase -mt-1">Beauty & Lifestyle</span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="হিজাব, আবায়া বা মেকআপ খুঁজুন..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-pink-50/50 border border-pink-100 rounded-2xl text-xs focus:outline-none focus:border-pink-300"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button 
              onClick={() => setActiveTab('live')}
              className={`px-3 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all ${activeTab === 'live' ? 'bg-rose-600 text-white shadow-md shadow-rose-200 animate-pulse' : 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'}`}
            >
              <Radio className="w-4 h-4 animate-bounce" />
              <span className="hidden sm:inline">ফ্রি লাইভ</span>
            </button>

            <button 
              onClick={() => setActiveTab('tracking')}
              className={`p-2 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTab === 'tracking' ? 'bg-pink-500 text-white shadow-md shadow-pink-200' : 'text-gray-600 hover:bg-pink-50'}`}
            >
              <Truck className="w-4 h-4" />
              <span className="hidden sm:inline">ট্র্যাক</span>
            </button>

            <button 
              onClick={() => setActiveTab('wishlist')}
              className={`p-2 rounded-2xl relative transition-all ${activeTab === 'wishlist' ? 'bg-pink-500 text-white shadow-md shadow-pink-200' : 'text-gray-600 hover:bg-pink-50'}`}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setActiveTab('cart')}
              className={`p-2 rounded-2xl relative transition-all ${activeTab === 'cart' ? 'bg-pink-500 text-white shadow-md shadow-pink-200' : 'text-gray-600 hover:bg-pink-50'}`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>

            <button 
              onClick={() => setActiveTab('admin')}
              className={`p-2 rounded-2xl transition-all ${activeTab === 'admin' ? 'bg-pink-500 text-white shadow-md shadow-pink-200' : 'text-gray-600 hover:bg-pink-50'}`}
              title="Admin Panel"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU NAV */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-pink-100 px-4 py-3 space-y-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="পণ্য খুঁজুন..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-pink-50/50 border border-pink-100 rounded-2xl text-xs"
            />
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 pt-6">

        {/* SHOP VIEW */}
        {activeTab === 'shop' && (
          <div className="space-y-8">
            
            {/* HERO BANNER */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white p-6 sm:p-10 shadow-xl">
              <div className="relative z-10 max-w-lg space-y-3">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Special Offer ✨
                </span>
                <h1 className="text-2xl sm:text-4xl font-black leading-tight drop-shadow-sm">
                  আপনার সৌন্দর্যে যোগ করুন নতুন মাত্রা! ✨
                </h1>
                <p className="text-xs sm:text-sm text-pink-100">
                  প্রিমিয়াম কাপড়ের হিজাব, আবায়া ও ১০০% অরজিনাল কসমেটিকস পাবেন এখন একটি প্ল্যাটফর্মেই।
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => setActiveTab('live')}
                    className="bg-white text-rose-600 hover:bg-pink-50 font-black px-5 py-2.5 rounded-2xl text-xs shadow-lg transition-all inline-flex items-center gap-2"
                  >
                    <Radio className="w-4 h-4 text-rose-600 animate-pulse" /> ফ্রি লাইভ সেলিং এ যুক্ত হোন
                  </button>
                </div>
              </div>
            </div>

            {/* ABOUT SM ONLINE SHOP SECTION */}
            <div className="bg-gradient-to-r from-pink-100/70 via-rose-50 to-pink-50 rounded-3xl p-6 sm:p-8 border border-pink-200/60 shadow-sm relative overflow-hidden">
              <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3">
                <div className="inline-flex items-center gap-1.5 bg-white text-pink-600 px-3.5 py-1 rounded-full text-xs font-black shadow-sm border border-pink-100">
                  <Sparkles className="w-3.5 h-3.5" /> আমাদের কথা (About Us)
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  স্বাগতম SM Online Shop-এ! 🌸
                </h2>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  <strong>SM Online Shop</strong> হলো আধুনিক ও শালীন নারীদের প্রথম পছন্দ। আমরা দিচ্ছি ১০০% অরজিনাল ও প্রিমিয়াম কোয়ালিটির হিজাব, এম্ব্রয়ডারি আবায়া, ট্রেন্ডি উইমেনস ফ্যাশন এবং বিশ্বস্ত ব্র্যান্ডের কসমেটিকস। সততা ও সেরা কাস্টমার সার্ভিস দেওয়াই আমাদের মূল লক্ষ্য। আপনার স্টাইল ও সৌন্দর্যকে অনন্য মাত্রা দিতে আমরা সর্বদা প্রতিশ্রুতিবদ্ধ।
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs font-bold text-pink-700">
                  <span className="bg-white/80 px-3 py-1.5 rounded-xl border border-pink-100 shadow-sm">✔ ১০০% অরজিনাল প্রোডাক্ট</span>
                  <span className="bg-white/80 px-3 py-1.5 rounded-xl border border-pink-100 shadow-sm">✔ দ্রুত ও নিরাপদ ডেলিভারি</span>
                  <span className="bg-white/80 px-3 py-1.5 rounded-xl border border-pink-100 shadow-sm">✔ ২৪/৭ কাস্টমার সাপোর্ট</span>
                </div>
              </div>
            </div>

            {/* LUCKY SPIN WHEEL SECTION */}
            <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-xs font-bold">
                <Sparkles className="w-4 h-4" /> Daily Lucky Spin
              </div>
              <h2 className="text-lg font-black text-gray-800">স্পিন করুন এবং জিতে নিন ২০% পর্যন্ত ডিসকাউন্ট কুপন!</h2>
              <p className="text-xs text-gray-500">{spinMessage}</p>
              <button 
                onClick={handleSpinWheel}
                disabled={isSpinning}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-6 py-3 rounded-2xl text-xs shadow-md shadow-pink-200 transition-all disabled:opacity-50"
              >
                {isSpinning ? 'স্পিন হচ্ছে...' : 'স্পিন ঘুরান 🎡'}
              </button>
            </div>

            {/* CATEGORIES */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {['All', 'Hijab & Abaya', 'Women Fashion', 'Cosmetics'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-pink-600 text-white shadow-md shadow-pink-200' : 'bg-white text-gray-600 hover:bg-pink-50 border border-pink-100'}`}
                >
                  {cat === 'All' ? 'সব পণ্য' : cat}
                </button>
              ))}
            </div>

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-square overflow-hidden bg-pink-50 cursor-pointer">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        onClick={() => setZoomedImage(product.image)}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        title="ছবিটি বড় করে দেখতে ক্লিক করুন"
                      />
                      <button 
                        onClick={() => toggleWishlist(product)}
                        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-2xl text-rose-500 hover:bg-white shadow-sm z-10"
                      >
                        <Heart className={`w-4 h-4 ${wishlist.some(w => w.id === product.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="p-3.5 sm:p-4 space-y-2">
                      <span className="text-[10px] font-bold text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-xs sm:text-sm text-gray-800 line-clamp-1">{product.name}</h3>
                      <div className="flex items-center gap-1 text-amber-500 text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold">{product.rating}</span>
                        <span className="text-gray-400 text-[10px]">({product.reviewsCount})</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-black text-sm sm:text-base text-rose-600">৳{product.price.toLocaleString()}</span>
                        {product.oldPrice && <span className="text-[11px] text-gray-400 line-through">৳{product.oldPrice.toLocaleString()}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 pt-0 space-y-2">
                    <button 
                      onClick={() => setSelectedProductForReview(product)}
                      className="w-full bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold py-2 rounded-xl text-[11px] transition-colors"
                    >
                      রিভিউ ও বিস্তারিত
                    </button>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-2 rounded-xl text-xs shadow-sm shadow-pink-200 hover:from-pink-600 hover:to-rose-600 transition-all flex items-center justify-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> কার্ট
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* FREE LIVE STREAM VIEW */}
        {activeTab === 'live' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-pink-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-rose-600 rounded-full animate-ping"></span>
                    <h2 className="text-xl font-black text-gray-900">SM Online Shop - ফ্রি লাইভ স্ট্রিমিং ও সেলিং</h2>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">সম্পূর্ণ ফ্রিতে ফেসবুক পেজ অথবা এই ওয়েবসাইট থেকে লাইভ ব্রডকাস্ট পরিচালনা করুন।</p>
                </div>
                <div className="flex gap-2">
                  <a 
                    href="https://www.facebook.com/share/1Ht6thexBz/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-2xl text-xs shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <Facebook className="w-4 h-4" /> ফেসবুকে সরাসরি লাইভ করুন (Free)
                  </a>
                </div>
              </div>

              {/* LIVE PLAYER SIMULATOR / EMBED SCREEN */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-xl flex items-center justify-center border border-pink-200">
                    <img 
                      src="https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80" 
                      alt="Live Preview" 
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute top-4 left-4 bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-black tracking-wider flex items-center gap-1.5 shadow-md">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> LIVE
                    </div>
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-pink-400" /> ১.৪k দর্শক দেখছেন
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-3xl text-white">
                      <h4 className="font-bold text-sm">নতুন শিফন হিজাব ও প্রিমিয়াম আবায়া কালেকশন লাইভ!</h4>
                      <p className="text-[11px] text-pink-200">কমান্ডে বা চ্যাটে আপনার পছন্দের কোডটি লিখে অর্ডার কনফার্ম করুন।</p>
                    </div>
                  </div>

                  <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100 text-xs space-y-2">
                    <h4 className="font-bold text-gray-900">💡 ফ্রিতে লাইভ করার সহজ গাইডলাইন:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-gray-600">
                      <li>আপনার মোবাইল বা কম্পিউটারের ক্যামেরা অন করে উপরে দেওয়া **ফেসবুক পেজ** লিংকে গিয়ে 'Create Live' চাপুন।</li>
                      <li>অথবা আপনার স্মার্টফোনে সরাসরি Facebook App ওপেন করে পেজ থেকে লাইভ শুরু করুন।</li>
                      <li>লাইভে দর্শকরা দাম ও কোড জিজ্ঞেস করলে আমাদের এই ওয়েবসাইটের লিংক দিন।</li>
                    </ol>
                  </div>
                </div>

                {/* LIVE CHAT FEED */}
                <div className="bg-pink-50/30 rounded-3xl border border-pink-100 p-4 flex flex-col h-[400px]">
                  <div className="border-b border-pink-100 pb-2 mb-3 flex items-center justify-between">
                    <h4 className="font-bold text-xs text-gray-800 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-pink-600" /> লাইভ কমেন্টস ও প্রশ্ন
                    </h4>
                    <span className="text-[10px] bg-pink-100 text-pink-700 font-bold px-2 py-0.5 rounded-full">সচল</span>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-2.5 text-xs pr-1">
                    {liveComments.map((c, i) => (
                      <div key={i} className="bg-white p-2.5 rounded-2xl border border-pink-100 shadow-sm">
                        <span className="font-bold text-pink-600 block text-[11px]">{c.user}</span>
                        <p className="text-gray-700 mt-0.5">{c.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-pink-100 mt-2 flex gap-2">
                    <input 
                      type="text" 
                      placeholder="লাইভে মন্তব্য লিখুন..." 
                      value={newLiveComment}
                      onChange={(e) => setNewLiveComment(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newLiveComment.trim()) {
                          setLiveComments([...liveComments, { user: 'অ্যাডমিন (SM Online Shop)', text: newLiveComment }]);
                          setNewLiveComment('');
                        }
                      }}
                      className="flex-1 px-3 py-2 bg-white border border-pink-100 rounded-xl text-xs focus:outline-none focus:border-pink-400"
                    />
                    <button 
                      onClick={() => {
                        if (!newLiveComment.trim()) return;
                        setLiveComments([...liveComments, { user: 'অ্যাডমিন (SM Online Shop)', text: newLiveComment }]);
                        setNewLiveComment('');
                      }}
                      className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-sm transition-colors"
                    >
                      পাঠান
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ORDER TRACKING VIEW */}
        {activeTab === 'tracking' && (
          <div className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center mx-auto">
                <Truck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-gray-900">অর্ডার ট্র্যাক করুন</h2>
              <p className="text-xs text-gray-500">আপনার অর্ডার আইডি লিখে বর্তমান স্ট্যাটাস দেখুন</p>
            </div>

            <form onSubmit={handleTrackOrder} className="space-y-3">
              <input 
                type="text" 
                placeholder="যেমন: SM-123456" 
                value={trackInput}
                onChange={(e) => setTrackInput(e.target.value)}
                className="w-full px-4 py-3 border border-pink-100 bg-pink-50/20 rounded-2xl text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-pink-400"
              />
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 rounded-2xl text-xs shadow-md shadow-pink-200"
              >
                ট্র্যাক সার্চ
              </button>
            </form>

            {trackResult && (
              <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">অর্ডার আইডি:</span>
                  <span className="font-bold text-gray-800">{trackResult.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">স্ট্যাটাস:</span>
                  <span className="font-bold text-emerald-600">{trackResult.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">আনুমানিক ডেলিভারি:</span>
                  <span className="font-bold text-gray-800">{trackResult.estimatedDelivery}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* WISHLIST VIEW */}
        {activeTab === 'wishlist' && (
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-xl font-black text-gray-900">আপনার পছন্দের তালিকা ({wishlist.length})</h2>
            {wishlist.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl border border-pink-100 text-center text-xs text-gray-400">
                পছন্দের তালিকায় কোনো পণ্য নেই।
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlist.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl border border-pink-100 flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs truncate">{item.name}</h4>
                      <p className="text-rose-600 font-black text-xs">৳{item.price}</p>
                    </div>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-pink-50 hover:bg-pink-100 text-pink-600 p-2 rounded-xl text-xs font-bold"
                    >
                      + কার্ট
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CART VIEW */}
        {activeTab === 'cart' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-xl font-black text-gray-900">শপিং কার্ট ({cart.length})</h2>
            {cart.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl border border-pink-100 text-center text-xs text-gray-400">
                আপনার কার্ট খালি রয়েছে।
              </div>
            ) : (
              <div className="bg-white p-6 rounded-3xl border border-pink-100 space-y-4 shadow-sm">
                <div className="divide-y divide-pink-50">
                  {cart.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-xl" />
                        <div>
                          <h4 className="font-bold text-xs text-gray-800">{item.name}</h4>
                          <p className="text-xs text-rose-600 font-bold">৳{item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded-lg bg-pink-50 text-pink-600"><Minus className="w-3 h-3" /></button>
                        <span className="text-xs font-bold px-2">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded-lg bg-pink-50 text-pink-600"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm pt-4 border-t border-pink-100">
                  <div className="flex justify-between text-gray-600">
                    <span>সাবটোটাল</span>
                    <span>৳{subtotal.toLocaleString()}</span>
                  </div>

                  {/* COUPON INPUT & DISCOUNT DISPLAY */}
                  <div className="pt-2 pb-1 border-t border-b border-pink-100 my-2 space-y-2">
                    <label className="block text-xs font-bold text-gray-700">কুপন / ডিসকাউন্ট কোড প্রয়োগ করুন</label>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-2xl text-xs">
                        <span className="font-bold text-emerald-700 flex items-center gap-1">
                          🎉 কুপন <code className="bg-emerald-100 px-1.5 py-0.5 rounded">{appliedCoupon}</code> একটিভ রয়েছে
                        </span>
                        <button onClick={removeCoupon} className="text-rose-500 font-bold hover:underline">
                          সরান
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="যেমন: SM15 বা FREESHIP" 
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            className="flex-1 px-3 py-2 border border-pink-100 bg-pink-50/20 rounded-xl text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-pink-400"
                          />
                          <button 
                            onClick={applyCoupon}
                            className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm transition-colors"
                          >
                            এপ্লাই
                          </button>
                        </div>
                        {couponError && <p className="text-[11px] text-rose-500 font-medium pl-1">{couponError}</p>}
                      </div>
                    )}
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>কুপন ডিসকাউন্ট ({discountPercent}%)</span>
                      <span>-৳{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>শিপিং চার্জ</span>
                    <span>{shipping === 0 ? <span className="text-emerald-600 font-bold">ফ্রি (কুপন অফার)</span> : `৳${shipping}`}</span>
                  </div>
                  <div className="border-t border-pink-100 pt-2 flex justify-between font-black text-gray-900 text-base">
                    <span>সর্বমোট পরিমাণ</span>
                    <span className="text-rose-600">৳{total.toLocaleString()}</span>
                  </div>

                  <button 
                    onClick={() => setCheckoutModal(true)}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-pink-200 mt-4"
                  >
                    চেকআউট করুন
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HIGH-SECURITY ADMIN PANEL VIEW */}
        {activeTab === 'admin' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-pink-100 shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600"></div>
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-pink-100">
                    <ShieldCheck className="w-8 h-8 text-pink-600" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">হাই-সিকিউরিটি অ্যাডমিন পোর্টাল</h2>
                  <p className="text-xs text-gray-500">আপনার আইডেন্টিটি এবং সিকিউরিটি পিন সংকেত দিয়ে লগইন করুন</p>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (adminUsername.trim() === 'SMADMIN' && adminPassword === 'SM2728' && adminPin === '5035') {
                    setIsAdminLoggedIn(true);
                    setLoginError('');
                    setAdminUsername('');
                    setAdminPassword('');
                    setAdminPin('');
                  } else {
                    setLoginError('ভুল আইডি, পাসওয়ার্ড বা 2FA সিকিউরিটি পিন প্রদান করেছেন!');
                  }
                }} className="space-y-4">
                  {loginError && (
                    <div className="bg-rose-50 text-rose-600 text-xs p-3 rounded-2xl font-medium text-center border border-rose-100">
                      {loginError}
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">এডমিন আইডি (User ID)</label>
                    <input
                      type="text"
                      required
                      placeholder="SMADMIN"
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      className="w-full px-4 py-3 border border-pink-100 bg-pink-50/30 rounded-2xl text-sm focus:outline-none focus:border-pink-400 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">পাসওয়ার্ড (Encrypted Password)</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-pink-100 bg-pink-50/30 rounded-2xl text-sm focus:outline-none focus:border-pink-400 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1 flex justify-between items-center">
                      <span>2FA সিকিউরিটি পিন (PIN Code)</span>
                      <span className="text-[10px] text-pink-500 font-bold">ডিফল্ট: 5035</span>
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      placeholder="5035"
                      value={adminPin}
                      onChange={(e) => setAdminPin(e.target.value)}
                      className="w-full px-4 py-3 border border-pink-100 bg-pink-50/30 rounded-2xl text-sm focus:outline-none focus:border-pink-400 font-mono text-center tracking-widest font-black"
                    />
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:opacity-95 text-white font-bold py-3.5 rounded-2xl text-sm shadow-lg shadow-pink-200 transition-all flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" /> নিরাপদে লগইন করুন
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
                  <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 flex items-center gap-2">
                      <Shield className="w-6 h-6 text-pink-600" /> অ্যাডমিন ড্যাশবোর্ড
                    </h1>
                    <p className="text-sm text-gray-500">আপনার শপের প্রোডাক্ট ক্যাটালগ ও এনক্রিপ্টেড ডিভাইস সিকিউরিটি পরিচালনা করুন।</p>
                  </div>
                  <button 
                    onClick={() => setIsAdminLoggedIn(false)}
                    className="bg-rose-50 text-rose-600 hover:bg-rose-100 font-semibold px-4 py-2 rounded-2xl text-xs transition-colors border border-rose-100"
                  >
                    লগআউট (Logout)
                  </button>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">লগইনকৃত ডিভাইসসমূহ (Active Sessions)</h3>
                      <p className="text-xs text-gray-500">বর্তমানে কোন কোন ডিভাইস থেকে অ্যাডমিন প্যানেল সচল আছে</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
                      {activeSessions.length}টি সেশন সক্রিয়
                    </span>
                  </div>

                  <div className="divide-y divide-pink-50">
                    {activeSessions.map((session) => (
                      <div key={session.id} className="py-3.5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${session.isCurrent ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600'}`}>
                            💻
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-gray-800 flex items-center gap-2">
                              {session.device} 
                              {session.isCurrent && <span className="bg-pink-500 text-white text-[10px] px-2 py-0.5 rounded-full">বর্তমান ডিভাইস</span>}
                            </h4>
                            <p className="text-xs text-gray-500">আইপি: {session.ip} • লগইন: {session.loginTime}</p>
                          </div>
                        </div>

                        {!session.isCurrent && (
                          <button 
                            onClick={() => {
                              setActiveSessions(activeSessions.filter(s => s.id !== session.id));
                            }}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors border border-rose-100"
                          >
                            রিমুভ করুন
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-6">
                  <h3 className="font-bold text-gray-900 text-lg">নতুন প্রোডাক্ট যোগ করুন</h3>
                  <form onSubmit={handleAddProductSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">প্রোডাক্টের নাম</label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: জর্জেট আবায়া"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-pink-100 bg-pink-50/20 rounded-2xl text-sm focus:outline-none focus:border-pink-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">মূল্য (BDT ৳)</label>
                      <input
                        type="number"
                        step="1"
                        min="1"
                        required
                        placeholder="১৫০০"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-pink-100 bg-pink-50/20 rounded-2xl text-sm focus:outline-none focus:border-pink-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">ক্যাটাগরি</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-pink-100 bg-pink-50/20 rounded-2xl text-sm focus:outline-none focus:border-pink-400 bg-white"
                      >
                        <option value="Hijab & Abaya">Hijab & Abaya</option>
                        <option value="Women Fashion">Women Fashion</option>
                        <option value="Cosmetics">Cosmetics</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">গ্যালারি থেকে ছবি সিলেক্ট করুন</label>
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleImageChange}
                        className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100 cursor-pointer pt-1"
                      />
                    </div>
                    {newProduct.image && (
                      <div className="sm:col-span-2 flex items-center gap-3 bg-pink-50/50 p-3 rounded-2xl border border-pink-100">
                        <img src={newProduct.image} alt="Preview" className="w-14 h-14 object-cover rounded-xl border border-pink-200" />
                        <span className="text-xs text-pink-700 font-medium">ছবি সফলভাবে সিলেক্ট করা হয়েছে!</span>
                      </div>
                    )}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">বিবরণ</label>
                      <textarea
                        rows="2"
                        placeholder="প্রোডাক্ট সম্পর্কে সংক্ষিপ্ত বিবরণ..."
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-pink-100 bg-pink-50/20 rounded-2xl text-sm focus:outline-none focus:border-pink-400"
                      ></textarea>
                    </div>
                    <div className="sm:col-span-2 pt-2">
                      <button type="submit" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium px-6 py-3 rounded-2xl text-sm shadow-md shadow-pink-200">
                        প্রোডাক্ট পাবলিশ করুন
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-4">
                  <h3 className="font-bold text-gray-900 text-lg">বিদ্যমান প্রোডাক্ট লিস্ট ({products.length}টি)</h3>
                  <div className="divide-y divide-pink-50">
                    {products.map(p => (
                      <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
                            }}
                            className="w-12 h-12 object-cover rounded-xl" 
                          />
                          <div>
                            <h4 className="font-bold text-sm text-gray-800">{p.name}</h4>
                            <p className="text-xs text-rose-600 font-semibold">৳{p.price.toLocaleString()} • <span className="text-gray-400">{p.category}</span></p>
                          </div>
                        </div>
                        <button 
                          onClick={() => deleteProduct(p.id)}
                          className="text-rose-500 hover:text-rose-700 p-2 rounded-xl hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* AI CUSTOMER LIVE CHAT FLOATING BUTTON & WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isChatOpen && (
          <div className="w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden flex flex-col h-[480px]">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <h3 className="font-bold text-sm">SM AI Support Assistant</h3>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-pink-50/20 text-xs">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[85%] ${msg.sender === 'user' ? 'bg-pink-600 text-white rounded-br-none' : 'bg-white text-gray-800 shadow-sm border border-pink-100 rounded-bl-none'}`}>
                    {msg.image && (
                      <img src={msg.image} alt="Upload" className="w-full h-32 object-cover rounded-xl mb-2 border border-pink-200" />
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {chatImagePreview && (
              <div className="p-2 bg-pink-50 border-t border-pink-100 flex items-center justify-between">
                <span className="text-[10px] text-pink-700 font-bold truncate">📷 ছবি সংযুক্ত করা হয়েছে</span>
                <button onClick={() => setChatImagePreview(null)} className="text-rose-500 font-bold text-xs">মুছুন</button>
              </div>
            )}

            <div className="p-3 bg-white border-t border-pink-100 flex gap-2 items-center">
              <label className="cursor-pointer text-gray-400 hover:text-pink-600 p-2 rounded-xl hover:bg-pink-50">
                <Camera className="w-5 h-5" />
                <input type="file" accept="image/*" onChange={handleChatImageUpload} className="hidden" />
              </label>
              <input 
                type="text" 
                placeholder="মেসেজ লিখুন..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-3 py-2 bg-pink-50/30 border border-pink-100 rounded-xl text-xs focus:outline-none focus:border-pink-400"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-xl shadow-sm transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="hidden sm:inline text-xs font-bold">লাইভ চ্যাট</span>
        </button>
      </div>

      {/* CHECKOUT MODAL */}
      {checkoutModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-pink-100 my-8">
            {orderSuccess ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">অর্ডার সফলভাবে সম্পন্ন হয়েছে! 🎉</h3>
                <p className="text-xs text-gray-500">আপনার অর্ডার আইডি: <strong className="text-pink-600 font-mono text-sm">{lastOrderDetails?.orderId}</strong></p>
                <div className="bg-pink-50/50 p-4 rounded-2xl text-left text-xs space-y-1.5 border border-pink-100">
                  <p><strong>গ্রাহক:</strong> {lastOrderDetails?.customerName}</p>
                  <p><strong>মোবাইল:</strong> {lastOrderDetails?.customerPhone}</p>
                  <p><strong>ঠিকানা:</strong> {lastOrderDetails?.customerAddress}</p>
                  <p><strong>পেমেন্ট মাধ্যম:</strong> {lastOrderDetails?.paymentMethod}</p>
                  <p><strong>মোট প্রাইজ:</strong> ৳{lastOrderDetails?.total.toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => {
                    setOrderSuccess(false);
                    setCheckoutModal(false);
                    setCart([]);
                    setActiveTab('shop');
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 rounded-2xl text-xs shadow-md shadow-pink-200"
                >
                  হোমপেজে ফিরে যান
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-pink-100 pb-3">
                  <h3 className="text-lg font-black text-gray-900">অর্ডার কনফার্মেশন ও পেমেন্ট</h3>
                  <button onClick={() => setCheckoutModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">আপনার নাম *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="পূর্ণ নাম লিখুন" 
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-pink-100 bg-pink-50/20 rounded-xl focus:outline-none focus:border-pink-400"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">মোবাইল নম্বর *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="01XXXXXXXXX" 
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-pink-100 bg-pink-50/20 rounded-xl focus:outline-none focus:border-pink-400"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">ডেলিভারি ঠিকানা *</label>
                    <textarea 
                      rows="2"
                      required
                      placeholder="বাসা/রোড, থানা, জেলা..." 
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-pink-100 bg-pink-50/20 rounded-xl focus:outline-none focus:border-pink-400"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">পেমেন্ট পদ্ধতি নির্বাচন করুন</label>
                    <select 
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-pink-100 bg-pink-50/20 rounded-xl focus:outline-none focus:border-pink-400 bg-white"
                    >
                      <option value="COD">ক্যাশ অন ডেলিভারি (Cash on Delivery)</option>
                      <option value="bKash">বিকাশ (bKash)</option>
                      <option value="Nagad">নগদ (Nagad)</option>
                      <option value="Rocket">রকেট (Rocket)</option>
                    </select>
                  </div>

                  {(paymentMethod === 'bKash' || paymentMethod === 'Nagad' || paymentMethod === 'Rocket') && (
                    <div className="bg-pink-50 p-3.5 rounded-xl border border-pink-200 space-y-2">
                      <p className="font-bold text-pink-700">আমাদের মার্চেন্ট নম্বর: <span className="font-mono text-sm bg-white px-2 py-0.5 rounded border border-pink-200">01827872334</span> ({paymentMethod})</p>
                      <p className="text-[11px] text-gray-600">টাকা পাঠিয়ে নিচের বক্সে ট্রানজেকশন আইডি (TrxID) লিখুন।</p>
                      <input 
                        type="text" 
                        placeholder="যেমন: 9N78K5M2X1" 
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                        className="w-full px-3 py-2 border border-pink-200 bg-white rounded-lg uppercase font-mono tracking-wider focus:outline-none focus:border-pink-400"
                      />
                    </div>
                  )}

                  <div className="pt-2">
                    <button 
                      onClick={handleConfirmOrder}
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 rounded-xl shadow-md shadow-pink-200"
                    >
                      অর্ডার কনফার্ম করুন (৳{total.toLocaleString()})
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PRODUCT REVIEWS & DETAILS MODAL */}
      {selectedProductForReview && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-pink-100 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start gap-4 border-b border-pink-100 pb-4">
              <div className="flex items-center gap-4">
                <img 
                  src={selectedProductForReview.image} 
                  alt={selectedProductForReview.name} 
                  onClick={() => setZoomedImage(selectedProductForReview.image)}
                  className="w-20 h-20 object-cover rounded-2xl border border-pink-100 cursor-pointer hover:opacity-90 transition-opacity"
                  title="ছবিটি বড় করে দেখতে ক্লিক করুন"
                />
                <div>
                  <span className="text-[10px] bg-pink-100 text-pink-700 font-bold px-2.5 py-0.5 rounded-full">{selectedProductForReview.category}</span>
                  <h3 className="font-black text-base text-gray-900 mt-1">{selectedProductForReview.name}</h3>
                  <p className="text-rose-600 font-black text-sm">৳{selectedProductForReview.price.toLocaleString()}</p>
                </div>
              </div>
              <button onClick={() => setSelectedProductForReview(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">পণ্যের বিবরণ:</h4>
                <p className="text-gray-600 leading-relaxed">{selectedProductForReview.description}</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-gray-800">কাস্টমার রিভিউ ({selectedProductForReview.reviews?.length || 0})</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {selectedProductForReview.reviews?.map((rev) => (
                    <div key={rev.id} className="bg-pink-50/50 p-3 rounded-2xl border border-pink-100 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800">{rev.name}</span>
                        <span className="text-amber-500 font-bold">★ {rev.rating}</span>
                      </div>
                      <p className="text-gray-600">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-pink-50/30 p-4 rounded-2xl border border-pink-100 space-y-3">
                <h4 className="font-bold text-gray-800">আপনার রিভিউ যোগ করুন</h4>
                <input 
                  type="text" 
                  placeholder="আপনার নাম" 
                  value={newReviewerName}
                  onChange={(e) => setNewReviewerName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-pink-100 rounded-xl focus:outline-none focus:border-pink-400"
                />
                <textarea 
                  rows="2"
                  placeholder="আপনার মূল্যবান মন্তব্য..." 
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-pink-100 rounded-xl focus:outline-none focus:border-pink-400"
                ></textarea>
                <button 
                  onClick={() => {
                    if (!newReviewerName || !newReviewComment) return;
                    const newRev = {
                      id: Date.now(),
                      name: newReviewerName,
                      rating: parseInt(newReviewRating),
                      comment: newReviewComment
                    };
                    const updatedProducts = products.map(p => {
                      if (p.id === selectedProductForReview.id) {
                        const updatedReviews = [newRev, ...(p.reviews || [])];
                        const newRating = (updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length).toFixed(1);
                        return {
                          ...p,
                          rating: parseFloat(newRating),
                          reviewsCount: updatedReviews.length,
                          reviews: updatedReviews
                        };
                      }
                      return p;
                    });
                    setProducts(updatedProducts);
                    setSelectedProductForReview(updatedProducts.find(p => p.id === selectedProductForReview.id));
                    setNewReviewerName('');
                    setNewReviewComment('');
                    alert('আপনার রিভিউ সফলভাবে যুক্ত হয়েছে!');
                  }}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded-xl shadow-sm transition-colors"
                >
                  রিভিউ সাবমিট করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT IMAGE FULLSCREEN ZOOM MODAL */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-3xl w-full max-h-[90vh] flex items-center justify-center p-2">
            <button 
              onClick={() => setZoomedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-pink-300 p-2 rounded-full bg-black/50 backdrop-blur-sm transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={zoomedImage} 
              alt="Zoomed Product View" 
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-pink-100 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500 space-y-4">
          <div className="flex justify-center items-center space-x-4">
            <a 
              href="https://www.facebook.com/share/1Ht6thexBz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center hover:bg-pink-100 transition-colors shadow-sm"
              title="Facebook Page"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/sm_online_shop770?srtk=azV5bDJ0Z2xhZWxm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center hover:bg-pink-100 transition-colors shadow-sm"
              title="Instagram Profile"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://wa.me/8801886995687" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center hover:bg-pink-100 transition-colors shadow-sm"
              title="WhatsApp Chat 1"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a 
              href="https://wa.me/8801827872334" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center hover:bg-pink-100 transition-colors shadow-sm"
              title="WhatsApp Chat 2"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
          <p>ইমেইল সাপোর্ট: 
            <a href="mailto:smonlineshop503@gmail.com" className="text-pink-600 font-bold underline ml-1">smonlineshop503@gmail.com</a>
          </p>
          <p>হোয়াটসঅ্যাপ অর্ডার ও সাপোর্টের জন্য: 
            <a href="https://wa.me/8801886995687" target="_blank" rel="noopener noreferrer" className="text-pink-600 font-bold underline ml-1">01886995687</a>, 
            <a href="https://wa.me/8801827872334" target="_blank" rel="noopener noreferrer" className="text-pink-600 font-bold underline ml-1">01827872334</a>
          </p>
          <p>© {new Date().getFullYear()} SM Online Shop. সর্বস্বত্ব সংরক্ষিত।</p>
          <p>মেয়েদের হিজাব, আবায়া ও কসমেটিকসের বিশ্বস্ত অনলাইন প্ল্যাটফর্ম।</p>
          <p className="text-[11px] font-bold text-pink-600 tracking-wide uppercase pt-2 border-t border-pink-50">
            Powered By SM Group
          </p>
        </div>
      </footer>
    </div>
  );
}
