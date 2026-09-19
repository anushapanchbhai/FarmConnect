// ============================================================
// FarmConnect - Complete Application Logic
// ============================================================

// --- ENHANCED AI CROP DETECTION WITH DETAILED CHARACTERISTICS ---
const AI_CROP_MAP = {
  'wheat': {
    name: { en: 'Golden Wheat (Triticum aestivum)', hi: 'सुनहरा गेहूँ (ट्रिटिकम एस्टिवम)', ka: 'ಚಿನ್ನದ ಗೋಧಿ', ta: 'தங்க கோதுமை', ml: 'സ്വർണ ഗോതമ്പ്' },
    category: 'major',
    variety: 'Sharbati / Hard Red Winter',
    condition: { en: 'Harvested – Dry, ready for milling', hi: 'कटा हुआ – सूखा, पिसाई के लिए तैयार', ka: 'ಕಟಾವು – ಒಣ, ಹಿಟ್ಟಿಗೆ ಸಿದ್ಧ', ta: 'அறுவடை – உலர்ந்தது', ml: 'കൊയ്ത് – ഉണങ്ങിയത്' },
    confidence: 96
  },
  'rice': {
    name: { en: 'Basmati Rice (Oryza sativa)', hi: 'बासमती चावल (ओरिज़ा सैटिवा)', ka: 'ಬಾಸ್ಮತಿ ಅಕ್ಕಿ', ta: 'பாஸ்மதி அரிசி', ml: 'ബസ്മതി അരി' },
    category: 'major',
    variety: 'Pusa Basmati 1121 – Extra Long Grain',
    condition: { en: 'Harvested – Aged paddy (1 year)', hi: 'कटा हुआ – पुराना धान (1 वर्ष)', ka: 'ಕೊಯ್ಲು – ಹಳೆಯ ಭತ್ತ', ta: 'அறுவடை – பழைய நெல்', ml: 'കൊയ്ത് – പഴയ നെല്ല്' },
    confidence: 99
  },
  'cotton': {
    name: { en: 'Cotton (Gossypium hirsutum)', hi: 'कपास (गॉसिपियम)', ka: 'ಹತ್ತಿ', ta: 'பருத்தி', ml: 'പരുത്തി' },
    category: 'major',
    variety: 'Bt Cotton – Medium Staple',
    condition: { en: 'Harvested – Raw cotton bolls, ready for ginning', hi: 'कटा हुआ – कच्चे कपास, जिनिंग के लिए तैयार', ka: 'ಕೊಯ್ಲು – ಕಚ್ಚಾ ಹತ್ತಿ', ta: 'அறுவடை – பச்சை பருத்தி', ml: 'കൊയ്ത് – പരുത്തി കായ' },
    confidence: 94
  },
  'sugarcane': {
    name: { en: 'Sugarcane (Saccharum officinarum)', hi: 'गन्ना (सैकेरम)', ka: 'ಕಬ್ಬು', ta: 'கரும்பு', ml: 'കരിമ്പ്' },
    category: 'major',
    variety: 'Co-86032 – High Sugar Content',
    condition: { en: 'Fresh – Standing crop, ready for crushing', hi: 'ताजा – खड़ी फसल, पेराई के लिए तैयार', ka: 'ತಾಜಾ – ನಿಂತ ಬೆಳೆ', ta: 'புதியது – நிற்கும் பயிர்', ml: 'പുതിയത് – നിൽക്കുന്ന വിള' },
    confidence: 95
  },
  'coffee': {
    name: { en: 'Robusta Coffee Beans (Coffea canephora)', hi: 'रोबस्टा कॉफी बीन्स', ka: 'ರೊಬಸ್ಟಾ ಕಾಫಿ ಬೀಜ', ta: 'ரோபஸ்டா காபி பீன்ஸ்', ml: 'റോബസ്റ്റ കാപ്പിക്കുരു' },
    category: 'major',
    variety: 'Robusta S.274 Parchment – AAA Grade',
    condition: { en: 'Dried – Sun-dried cherry, premium curing', hi: 'सूखा – धूप में सुखाया, प्रीमियम क्यरिंग', ka: 'ಒಣಗಿಸಿದ – ಹುರಿಯಲು ಸಿದ್ಧ', ta: 'உலர்ந்தது – வறுக்க தயார்', ml: 'ഉണക്കിയത് – വറുക്കാൻ തയ്യാർ' },
    confidence: 97
  },
  'tea': {
    name: { en: 'Assam Tea Leaves (Camellia sinensis)', hi: 'असम चाय पत्ती', ka: 'ಅಸ್ಸಾಂ ಚಹಾ ಎಲೆ', ta: 'அசாம் தேயிலை', ml: 'അസം ചായില' },
    category: 'major',
    variety: 'CTC Orthodox – First Flush',
    condition: { en: 'Fresh – Freshly plucked green leaves', hi: 'ताजा – ताजा तोड़ी हरी पत्तियां', ka: 'ತಾಜಾ – ಹೊಸ ಎಲೆ', ta: 'புதியது – பறிக்கப்பட்ட இலை', ml: 'പുതിയത് – പറിച്ച ഇല' },
    confidence: 91
  },
  'jute': {
    name: { en: 'Jute Fiber (Corchorus capsularis)', hi: 'जूट फाइबर (पटसन)', ka: 'ಸೆಣಬಿನ ನಾರು', ta: 'சணல் நார்', ml: 'ചണ നാര്' },
    category: 'major',
    variety: 'White Jute – TD-5',
    condition: { en: 'Dried – Retted and sun-dried golden fibers', hi: 'सूखा हुआ – सुनहरी रेशे', ka: 'ಒಣಗಿಸಿದ – ಚಿನ್ನದ ನಾರು', ta: 'உலர்ந்தது – தங்க நார்', ml: 'ഉണക്കിയത് – സ്വർണ നാര്' },
    confidence: 92
  },
  'pepper': {
    name: { en: 'Black Pepper (Piper nigrum)', hi: 'काली मिर्च', ka: 'ಕರಿ ಮೆಣಸು', ta: 'கருமிளகு', ml: 'കുരുമുളക്' },
    category: 'major',
    variety: 'Panniyur-1 – Bold Grade',
    condition: { en: 'Dried – Sun-dried peppercorns, Grade A', hi: 'सूखा – धूप में सुखाया, ग्रेड ए', ka: 'ಒಣಗಿಸಿದ – ಗ್ರೇಡ್ ಎ', ta: 'உலர்ந்தது – கிரேடு A', ml: 'ഉണക്കിയത് – ഗ്രേഡ് A' },
    confidence: 94
  },
  'groundnut': {
    name: { en: 'Groundnut (Arachis hypogaea)', hi: 'मूंगफली', ka: 'ಕಡಲೆಕಾಯಿ', ta: 'நிலக்கடலை', ml: 'നിലക്കടല' },
    category: 'major',
    variety: 'Bold Runner – Gujarat Type',
    condition: { en: 'Harvested – In-shell, dried and sorted', hi: 'कटा हुआ – छिलके सहित, सूखी और छंटी', ka: 'ಕೊಯ್ಲು – ಸಿಪ್ಪೆ ಸಹಿತ', ta: 'அறுவடை – ஓட்டுடன்', ml: 'കൊയ്ത് – തൊണ്ടോടെ' },
    confidence: 93
  },
  'mustard': {
    name: { en: 'Mustard Seeds (Brassica juncea)', hi: 'सरसों के बीज', ka: 'ಸಾಸಿವೆ', ta: 'கடுகு', ml: 'കടുക്' },
    category: 'major',
    variety: 'Yellow Mustard – Pusa Bold',
    condition: { en: 'Dried – Clean seeds, ready for oil extraction', hi: 'सूखा – साफ बीज, तेल निकालने के लिए तैयार', ka: 'ಒಣ – ಎಣ್ಣೆಗೆ ಸಿದ್ಧ', ta: 'உலர்ந்தது – எண்ணெய்க்கு தயார்', ml: 'ഉണക്കിയത് – എണ്ണയ്ക്ക് തയ്യാർ' },
    confidence: 95
  },
  'ragi': {
    name: { en: 'Finger Millet – Ragi (Eleusine coracana)', hi: 'रागी (मंडुआ)', ka: 'ರಾಗಿ', ta: 'கேழ்வரகு', ml: 'റാഗി' },
    category: 'major',
    variety: 'GPU-28 – High Calcium',
    condition: { en: 'Harvested – Dried grain, cleaned', hi: 'कटा हुआ – सूखा अनाज, साफ', ka: 'ಕೊಯ್ಲು – ಒಣ ಧಾನ್ಯ', ta: 'அறுவடை – சுத்தமான தானியம்', ml: 'കൊയ്ത് – വൃത്തിയാക്കിയ ധാന്യം' },
    confidence: 92
  },
  'dal': {
    name: { en: 'Tur Dal / Pigeon Pea (Cajanus cajan)', hi: 'तूर दाल (अरहर)', ka: 'ತೊಗರಿ ಬೇಳೆ', ta: 'துவரம் பருப்பு', ml: 'തുവര പരിപ്പ്' },
    category: 'major',
    variety: 'ICPL-87 – Split Unpolished',
    condition: { en: 'Dried – Split, unpolished, organic', hi: 'सूखा – अनपॉलिश्ड, जैविक', ka: 'ಒಣ – ಸಾವಯವ', ta: 'உலர்ந்தது – இயற்கை', ml: 'ഉണക്കിയത് – ജൈവ' },
    confidence: 91
  },
  'mango': {
    name: { en: 'Alphonso Mango (Mangifera indica)', hi: 'अल्फांसो आम', ka: 'ಆಲ್ಫೋನ್ಸೊ ಮಾವು', ta: 'அல்போன்சா மாம்பழம்', ml: 'അൽഫോൻസോ മാങ്ങ' },
    category: 'major',
    variety: 'Hapus – Ratnagiri Export Grade',
    condition: { en: 'Fresh – Naturally ripened, Grade A fruit', hi: 'ताजा – प्राकृतिक रूप से पका, ग्रेड A', ka: 'ತಾಜಾ – ಸ್ವಾಭಾವಿಕವಾಗಿ ಬಲಿತ', ta: 'புதியது – இயற்கையாக பழுத்தது', ml: 'പുതിയത് – സ്വാഭാവിക പഴുക്കൽ' },
    confidence: 96
  },
  'apple': {
    name: { en: 'Himalayan Apple (Malus domestica)', hi: 'हिमालयन सेब', ka: 'ಹಿಮಾಲಯ ಸೇಬು', ta: 'இமயமலை ஆப்பிள்', ml: 'ഹിമാലയൻ ആപ്പിൾ' },
    category: 'major',
    variety: 'Red Delicious – Shimla Grade',
    condition: { en: 'Fresh – Hand-picked, crisp, ready-to-eat', hi: 'ताजा – हाथ से तोड़ा, कुरकुरा', ka: 'ತಾಜಾ – ಕೈಯಿಂದ ಕೊಯ್ದ', ta: 'புதியது – கையால் பறிக்கப்பட்டது', ml: 'പുതിയത് – കൈകൊണ്ട് പറിച്ചത്' },
    confidence: 94
  },
  'tomato': {
    name: { en: 'Tomato (Solanum lycopersicum)', hi: 'टमाटर', ka: 'ಟೊಮೆಟೊ', ta: 'தக்காளி', ml: 'തക്കാളി' },
    category: 'vegetable',
    variety: 'Hybrid NS-501',
    condition: { en: 'Fresh – Vine-ripened, firm', hi: 'ताजा – बेल पर पका, सख्त', ka: 'ತಾಜಾ – ಬಳ್ಳಿಯಲ್ಲಿ ಹಣ್ಣಾದ', ta: 'புதியது – கொடியில் பழுத்தது', ml: 'പുതിയത് – വള്ളിയിൽ പഴുത്തത്' },
    confidence: 97
  },
  'potato': {
    name: { en: 'Potato (Solanum tuberosum)', hi: 'आलू', ka: 'ಆಲೂಗಡ್ಡೆ', ta: 'உருளைக்கிழங்கு', ml: 'ഉരുളക്കിഴങ്ങ്' },
    category: 'vegetable',
    variety: 'Kufri Jyoti – Table Variety',
    condition: { en: 'Fresh – Cleaned, medium size', hi: 'ताजा – साफ, मध्यम आकार', ka: 'ತಾಜಾ – ಸ್ವಚ್ಛ', ta: 'புதியது – சுத்தமான', ml: 'പുതിയത് – വൃത്തിയാക്കിയ' },
    confidence: 96
  },
  'onion': {
    name: { en: 'Red Onion (Allium cepa)', hi: 'लाल प्याज', ka: 'ಕೆಂಪು ಈರುಳ್ಳಿ', ta: 'சிவப்பு வெங்காயம்', ml: 'ചുവന്ന ഉള്ളി' },
    category: 'vegetable',
    variety: 'Nashik Red – Medium Bulb',
    condition: { en: 'Dried – Cured, storage-ready', hi: 'सूखा – भंडारण के लिए तैयार', ka: 'ಒಣ – ಸಂಗ್ರಹಕ್ಕೆ ಸಿದ್ಧ', ta: 'உலர்ந்தது – சேமிப்பிற்கு தயார்', ml: 'ഉണക്കിയത് – സൂക്ഷിക്കാൻ തയ്യാർ' },
    confidence: 95
  },
};

function simulateAICropDetection(fileName) {
  const lower = fileName.toLowerCase();
  for (const key in AI_CROP_MAP) {
    if (lower.includes(key)) return { detected: true, key: key, data: AI_CROP_MAP[key] };
  }
  // Smart fallback based on common patterns in filenames
  const fallbackMap = {
    'img': 'wheat', 'photo': 'rice', 'pic': 'cotton', 'crop': 'sugarcane',
    'field': 'wheat', 'farm': 'rice', 'grain': 'wheat', 'seed': 'mustard',
    'leaf': 'tea', 'bean': 'coffee', 'fruit': 'mango', 'fiber': 'jute'
  };
  for (const pattern in fallbackMap) {
    if (lower.includes(pattern)) {
      const k = fallbackMap[pattern];
      return { detected: true, key: k, data: AI_CROP_MAP[k] };
    }
  }
  // Final random fallback
  const keys = Object.keys(AI_CROP_MAP);
  const rk = keys[Math.floor(Math.random() * keys.length)];
  return { detected: true, key: rk, data: AI_CROP_MAP[rk] };
}

// --- 20 INITIAL CROPS (categorized as major/vegetable) ---
const INITIAL_CROPS = [
  { id: 1, name: "Premium Golden Wheat", category: "major", farmer: "M.S. Swaminathan Farm", phone: "9000000001", quantity: 1500, unit: "kg", price: 28, desc: "High protein, low moisture Sharbati wheat.", loc: "Punjab", lat: 30.73, lng: 76.78, img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80", reviews: [], isSimulated: true },
  { id: 2, name: "Long Grain Basmati Rice", category: "major", farmer: "Kisan Trust", phone: "9876543213", quantity: 800, unit: "kg", price: 85, desc: "Aromatic Pusa 1121 variety.", loc: "Karnal, HR", lat: 29.68, lng: 76.98, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80", reviews: [], isSimulated: true },
  { id: 3, name: "Raw Cotton Bales", category: "major", farmer: "Rao Textiles", phone: "9876543216", quantity: 500, unit: "kg", price: 62, desc: "Clean white Bt cotton.", loc: "Nagpur, MH", lat: 21.14, lng: 79.08, img: "https://images.unsplash.com/photo-1605001011153-a5519fb4fec5?w=500&q=80", reviews: [], isSimulated: true },
  { id: 4, name: "Robusta Coffee Bean", category: "major", farmer: "Coorg Plantations", phone: "9876543219", quantity: 200, unit: "kg", price: 310, desc: "Sun-dried Robusta cherry.", loc: "Coorg, KA", lat: 12.33, lng: 75.80, img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&q=80", reviews: [], isSimulated: true },
  // ... more initial crops could stay, but keep these as 'isSimulated: true' for the requirement
];

// --- COMPLETE I18N DICTIONARY ---
const I18N = {
  en: {
    nav_brand: "🌱 FarmConnect",
    nav_logout: "Logout",
    login_btn: "Login / Signup",
    dashboard_link: "Dashboard",
    chat_link: "Chat",
    tagline: "Empowering Farmers Through Direct Access",
    sub_tagline: "Connect directly with verified farmers. No middlemen, fair prices, and fresh produce delivered to your door with automated logistics.",
    for_farmers: "🚜 For Farmers",
    for_farmers_desc: "List your crops in minutes and sell directly for better profits.",
    for_buyers: "🛒 For Buyers",
    for_buyers_desc: "Access fresh produce instantly with transparent smart pricing.",
    for_transporters: "🚚 For Transporters",
    for_transporters_desc: "Get nearby pickup alerts automatically and track deliveries.",
    get_started: "Get Started Today",
    change_lang: "Change Language",
    welcome_login: "Login with Phone Number",
    phone_placeholder: "Enter 10-digit phone number",
    select_role: "Select Your Role",
    choose_role: "-- Choose your role --",
    role_farmer: "Farmer (Sell produce)",
    role_buyer: "Buyer (Buy produce)",
    role_transporter: "Transporter (Deliveries)",
    proto_note: "Prototype Mode: OTP is simulated automatically",
    farmer_dashboard: "Farmer Dashboard",
    list_crop: "Add New Crop",
    crop_name: "Crop Name",
    crop_name_ph: "e.g. Tomatoes",
    or_upload: "Or Upload Crop Image for AI Detection",
    ai_detecting: "🤖 AI is detecting the crop...",
    ai_detected: "🤖 AI Detected",
    qty: "Available Quantity",
    qty_ph: "e.g. 100",
    unit: "Unit",
    price: "Price per kg (₹)",
    price_ph: "e.g. 40",
    loc: "Location",
    loc_auto: "📍 Auto-detecting location...",
    loc_detected: "📍 Location detected!",
    submit_list: "✅ List Produce",
    your_listings: "Your Listed Crops",
    no_listings: "You have not listed any crops yet.",
    incoming_orders: "Incoming Orders",
    no_orders: "No orders received yet.",
    crop_listed_ok: "Crop listed successfully!",
    market_title: "Fresh Produce Market",
    no_middlemen: "🤝 No Middlemen – Fair Prices!",
    search_ph: "🔍 Search crops by name...",
    filters: "Filters",
    crop_type: "Crop Type",
    all: "All",
    vegetables: "Vegetables",
    fruits: "Fruits",
    grains: "Grains",
    max_price: "Max Price (₹)",
    apply_filters: "Apply Filters",
    smart_price_info: "Prices are set directly by farmers and verified by our smart pricing algorithm.",
    buy_now: "Buy Now",
    add_to_cart: "➕ Add to Cart",
    remove_from_cart: "❌ Remove",
    cart_title: "🛒 Your Cart",
    cart_empty: "Cart is empty",
    cart_item: "item",
    cart_items: "items",
    enter_qty: "Qty",
    undo: "↩ Undo",
    redo: "↪ Redo",
    place_order: "📦 Place Order",
    order_placed_ok: "Order placed successfully! Notification sent to transporters.",
    confirm_buy: "Confirm this purchase?",
    reviews: "Reviews",
    no_reviews: "No reviews yet",
    write_review: "Write a Review",
    review_ph: "Share your experience about quality...",
    submit_review: "Submit Review",
    review_submitted: "Review submitted!",
    rating: "Rating",
    stars: "Stars",
    avg_rating: "Avg Rating",
    view_reviews: "View Reviews",
    close: "Close",
    transporter_dashboard: "Transporter Dashboard",
    live_notifications: "🔔 Live Delivery Requests",
    no_jobs: "No delivery jobs available right now.",
    new_request: "🚨 New Delivery Request!",
    accept_job: "Accept Job",
    current_job: "Current Job",
    pickup_farmer: "Pickup (Farmer)",
    dropoff_buyer: "Drop-off (Buyer)",
    call_farmer: "📞 Call Farmer",
    call_buyer: "📞 Call Buyer",
    view_map: "🗺️ View on Map",
    update_status: "Update Delivery Status",
    status_pending: "Pending",
    status_assigned: "Assigned",
    status_transit: "In Transit",
    status_delivered: "Delivered",
    already_delivered: "This order is already delivered!",
    transporter_assigned: "Transporter has been assigned!",
    order_tracking: "Order Tracking",
    your_orders: "Your Orders",
    no_active_orders: "No active orders.",
    auto_assign: "Auto-Assign Driver",
    comm_system: "Communication",
    type_message: "Type a message...",
    calling: "Calling...",
    end_call: "End Call",
    from: "From",
    to: "To",
    phone: "Phone",
    avail: "Available",
    per_kg: "/kg",
    farm: "Farm",
    loc_label: "Location",
    total: "Total",
    order_id: "Order",
    buyer_label: "Buyer",
    farmer_label: "Farmer",
    time_label: "Time",
    select_lang: "Select Your Language",
    select_lang_sub: "Please choose your preferred language",
    view_bill: "View Bill",
    invoice: "Invoice",
    billing_details: "Billing Details",
    payment_status: "Payment Status",
    paid: "Paid",
    pending: "Pending",
    pay_now: "Pay Now",
    transport_charges: "Transport Charges",
    transporter_info: "Transporter Info",
    eta: "ETA",
    payment_method: "Payment Method",
    select_payment: "Select Payment Method",
    upi: "UPI (Google Pay/PhonePe)",
    card: "Credit/Debit Card",
    netbanking: "Net Banking",
    processing: "Processing...",
    payment_success: "Payment Successful!",
    coming_soon: "Coming Soon",
    waiting_farmers: "Waiting for farmers to list crops",
    transport_accepted: "Transporter Accepted",
    charges_subtotal: "Subtotal",
    tax: "Service Fee (2%)",
  },
  hi: {
    nav_brand: "🌱 फार्म-कनेक्ट",
    nav_logout: "लॉग आउट",
    login_btn: "लॉगिन / साइनअप",
    dashboard_link: "डैशबोर्ड",
    chat_link: "चैट",
    tagline: "किसानों को सीधी पहुँच से सशक्त बनाना",
    sub_tagline: "सत्यापित किसानों से सीधे जुड़ें। बिचौलिए नहीं, उचित मूल्य, और स्वचालित लॉजिस्टिक्स के साथ ताजा उपज आपके दरवाजे तक।",
    for_farmers: "🚜 किसानों के लिए",
    for_farmers_desc: "कुछ ही मिनटों में अपनी फसल सूचीबद्ध करें और सीधे बेचें।",
    for_buyers: "🛒 खरीदारों के लिए",
    for_buyers_desc: "पारदर्शी मूल्य के साथ ताजा उपज तुरंत प्राप्त करें।",
    for_transporters: "🚚 ट्रांसपोर्टरों के लिए",
    for_transporters_desc: "पास के पिकअप अलर्ट स्वचालित रूप से प्राप्त करें।",
    get_started: "आज ही शुरू करें",
    change_lang: "भाषा बदलें",
    welcome_login: "फोन नंबर से लॉगिन करें",
    phone_placeholder: "10 अंकों का फोन नंबर दर्ज करें",
    select_role: "अपनी भूमिका चुनें",
    choose_role: "-- भूमिका चुनें --",
    role_farmer: "किसान (उपज बेचें)",
    role_buyer: "खरीदार (उपज खरीदें)",
    role_transporter: "ट्रांसपोर्टर (डिलीवरी)",
    proto_note: "प्रोटोटाइप मोड: OTP स्वचालित है",
    farmer_dashboard: "किसान डैशबोर्ड",
    list_crop: "नई फसल जोड़ें",
    crop_name: "फसल का नाम",
    crop_name_ph: "जैसे टमाटर",
    or_upload: "या AI पहचान के लिए फसल की फोटो अपलोड करें",
    ai_detecting: "🤖 AI फसल की पहचान कर रहा है...",
    ai_detected: "🤖 AI ने पहचाना",
    qty: "उपलब्ध मात्रा",
    qty_ph: "जैसे 100",
    unit: "इकाई",
    price: "प्रति किलो कीमत (₹)",
    price_ph: "जैसे 40",
    loc: "स्थान",
    loc_auto: "📍 स्थान खोज रहा है...",
    loc_detected: "📍 स्थान मिल गया!",
    submit_list: "✅ उपज सूचीबद्ध करें",
    your_listings: "आपकी सूचीबद्ध फसलें",
    no_listings: "आपने अभी तक कोई फसल सूचीबद्ध नहीं की है।",
    incoming_orders: "आने वाले ऑर्डर",
    no_orders: "अभी तक कोई ऑर्डर नहीं मिला।",
    crop_listed_ok: "फसल सफलतापूर्वक सूचीबद्ध!",
    market_title: "ताजा उपज बाज़ार",
    no_middlemen: "🤝 बिचौलिए नहीं - सही दाम!",
    search_ph: "🔍 फसल खोजें...",
    filters: "फ़िल्टर",
    crop_type: "फसल का प्रकार",
    all: "सब",
    vegetables: "सब्ज़ियाँ",
    fruits: "फल",
    grains: "अनाज",
    max_price: "अधिकतम मूल्य (₹)",
    apply_filters: "फ़िल्टर लगाएं",
    smart_price_info: "कीमतें सीधे किसानों द्वारा निर्धारित और हमारे एल्गोरिदम द्वारा सत्यापित हैं।",
    buy_now: "अभी खरीदें",
    add_to_cart: "➕ कार्ट में जोड़ें",
    remove_from_cart: "❌ हटाएँ",
    cart_title: "🛒 आपकी कार्ट",
    cart_empty: "कार्ट खाली है",
    cart_item: "आइटम",
    cart_items: "आइटम",
    enter_qty: "मात्रा",
    undo: "↩ पूर्ववत",
    redo: "↪ फिर से",
    place_order: "📦 ऑर्डर करें",
    order_placed_ok: "ऑर्डर सफल! ट्रांसपोर्टर को सूचना भेजी गई।",
    confirm_buy: "क्या आप यह खरीदना चाहते हैं?",
    reviews: "समीक्षाएं",
    no_reviews: "अभी तक कोई समीक्षा नहीं",
    write_review: "समीक्षा लिखें",
    review_ph: "गुणवत्ता के बारे में अपना अनुभव साझा करें...",
    submit_review: "समीक्षा भेजें",
    review_submitted: "समीक्षा भेजी गई!",
    rating: "रेटिंग",
    stars: "स्टार",
    avg_rating: "औसत रेटिंग",
    view_reviews: "समीक्षाएं देखें",
    close: "बंद करें",
    transporter_dashboard: "ट्रांसपोर्टर डैशबोर्ड",
    live_notifications: "🔔 लाइव डिलीवरी अनुरोध",
    no_jobs: "अभी कोई डिलीवरी जॉब उपलब्ध नहीं।",
    new_request: "🚨 नया डिलीवरी अनुरोध!",
    accept_job: "जॉब स्वीकार करें",
    current_job: "वर्तमान जॉब",
    pickup_farmer: "पिकअप (किसान)",
    dropoff_buyer: "डिलीवरी (खरीदार)",
    call_farmer: "📞 किसान को कॉल करें",
    call_buyer: "📞 खरीदार को कॉल करें",
    view_map: "🗺️ मानचित्र पर देखें",
    update_status: "डिलीवरी स्थिति अपडेट करें",
    status_pending: "लंबित",
    status_assigned: "सौंपा गया",
    status_transit: "रास्ते में",
    status_delivered: "पहुँचा दिया",
    already_delivered: "यह ऑर्डर पहले ही डिलीवर हो चुका है!",
    transporter_assigned: "ट्रांसपोर्टर सौंपा गया!",
    order_tracking: "ऑर्डर ट्रैकिंग",
    your_orders: "आपके ऑर्डर",
    no_active_orders: "कोई सक्रिय ऑर्डर नहीं।",
    auto_assign: "ड्राइवर ऑटो-असाइन करें",
    comm_system: "संचार",
    type_message: "संदेश लिखें...",
    calling: "कॉल कर रहे हैं...",
    end_call: "कॉल समाप्त",
    from: "से",
    to: "को",
    phone: "फ़ोन",
    avail: "उपलब्ध",
    per_kg: "/किलो",
    farm: "खेत",
    loc_label: "स्थान",
    total: "कुल",
    order_id: "ऑर्डर",
    buyer_label: "खरीदार",
    farmer_label: "किसान",
    time_label: "समय",
    select_lang: "अपनी भाषा चुनें",
    select_lang_sub: "कृपया अपनी पसंदीदा भाषा चुनें",
  },
  ka: {
    nav_brand: "🌱 ಫಾರ್ಮ್‌ಕನೆಕ್ಟ್",
    nav_logout: "ಲಾಗ್ಔಟ್",
    login_btn: "ಲಾಗಿನ್ / ಸೈನ್ ಅಪ್",
    dashboard_link: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    chat_link: "ಚಾಟ್",
    tagline: "ರೈತರಿಗೆ ನೇರ ಪ್ರವೇಶದ ಮೂಲಕ ಸಬಲೀಕರಣ",
    sub_tagline: "ಪರಿಶೀಲಿಸಿದ ರೈತರೊಂದಿಗೆ ನೇರವಾಗಿ ಸಂಪರ್ಕ ಹೊಂದಿ. ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲ, ನ್ಯಾಯೋಚಿತ ಬೆಲೆ.",
    for_farmers: "🚜 ರೈತರಿಗಾಗಿ",
    for_farmers_desc: "ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ನಿಮಿಷಗಳಲ್ಲಿ ಪಟ್ಟಿ ಮಾಡಿ ಮತ್ತು ನೇರವಾಗಿ ಮಾರಾಟ ಮಾಡಿ.",
    for_buyers: "🛒 ಖರೀದಿದಾರರಿಗಾಗಿ",
    for_buyers_desc: "ಪಾರದರ್ಶಕ ಬೆಲೆಯೊಂದಿಗೆ ತಾಜಾ ಉತ್ಪನ್ನ ಪಡೆಯಿರಿ.",
    for_transporters: "🚚 ಸಾರಿಗೆದಾರರಿಗಾಗಿ",
    for_transporters_desc: "ಹತ್ತಿರದ ಪಿಕಪ್ ಮಾಹಿತಿಯನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪಡೆಯಿರಿ.",
    get_started: "ಇಂದೇ ಪ್ರಾರಂಭಿಸಿ",
    change_lang: "ಭಾಷೆ ಬದಲಿಸಿ",
    welcome_login: "ಫೋನ್ ಸಂಖ್ಯೆಯಿಂದ ಲಾಗಿನ್",
    phone_placeholder: "10 ಅಂಕಿಯ ಫೋನ್ ನಂಬರ್",
    select_role: "ನಿಮ್ಮ ಪಾತ್ರ ಆಯ್ಕೆ ಮಾಡಿ",
    choose_role: "-- ಪಾತ್ರ ಆಯ್ಕೆ --",
    role_farmer: "ರೈತ (ಬೆಳೆ ಮಾರಾಟ)",
    role_buyer: "ಖರೀದಿದಾರ (ಬೆಳೆ ಖರೀದಿ)",
    role_transporter: "ಸಾರಿಗೆದಾರ (ಡೆಲಿವರಿ)",
    proto_note: "ಪ್ರೋಟೋಟೈಪ್ ಮೋಡ್: OTP ಸ್ವಯಂಚಾಲಿತ",
    farmer_dashboard: "ರೈತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    list_crop: "ಹೊಸ ಬೆಳೆ ಸೇರಿಸಿ",
    crop_name: "ಬೆಳೆಯ ಹೆಸರು",
    crop_name_ph: "ಉದಾ. ಟೊಮೆಟೊ",
    or_upload: "ಅಥವಾ AI ಪತ್ತೆಗಾಗಿ ಬೆಳೆ ಚಿತ್ರ ಅಪ್ಲೋಡ್ ಮಾಡಿ",
    ai_detecting: "🤖 AI ಬೆಳೆಯನ್ನು ಕಂಡುಹಿಡಿಯುತ್ತಿದೆ...",
    ai_detected: "🤖 AI ಪತ್ತೆ ಮಾಡಿದೆ",
    qty: "ಲಭ್ಯ ಪ್ರಮಾಣ",
    qty_ph: "ಉದಾ. 100",
    unit: "ಘಟಕ",
    price: "ಪ್ರತಿ ಕೆಜಿ ಬೆಲೆ (₹)",
    price_ph: "ಉದಾ. 40",
    loc: "ಸ್ಥಳ",
    loc_auto: "📍 ಸ್ಥಳ ಹುಡುಕುತ್ತಿದೆ...",
    loc_detected: "📍 ಸ್ಥಳ ಪತ್ತೆಯಾಯಿತು!",
    submit_list: "✅ ಬೆಳೆ ಸೇರಿಸಿ",
    your_listings: "ನಿಮ್ಮ ಪಟ್ಟಿ ಮಾಡಿದ ಬೆಳೆಗಳು",
    no_listings: "ನೀವು ಇನ್ನೂ ಯಾವ ಬೆಳೆಯನ್ನೂ ಪಟ್ಟಿ ಮಾಡಿಲ್ಲ.",
    incoming_orders: "ಬಂದ ಆರ್ಡರ್‌ಗಳು",
    no_orders: "ಇನ್ನೂ ಆರ್ಡರ್ ಬಂದಿಲ್ಲ.",
    crop_listed_ok: "ಬೆಳೆ ಯಶಸ್ವಿಯಾಗಿ ಸೇರಿಸಲಾಗಿದೆ!",
    market_title: "ತಾಜಾ ಉತ್ಪನ್ನ ಮಾರುಕಟ್ಟೆ",
    no_middlemen: "🤝 ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲ - ನ್ಯಾಯೋಚಿತ ಬೆಲೆ!",
    search_ph: "🔍 ಬೆಳೆ ಹುಡುಕಿ...",
    filters: "ಫಿಲ್ಟರ್‌ಗಳು",
    crop_type: "ಬೆಳೆ ವಿಧ",
    all: "ಎಲ್ಲಾ",
    vegetables: "ತರಕಾರಿ",
    fruits: "ಹಣ್ಣುಗಳು",
    grains: "ಧಾನ್ಯಗಳು",
    max_price: "ಗರಿಷ್ಠ ಬೆಲೆ (₹)",
    apply_filters: "ಫಿಲ್ಟರ್ ಅನ್ವಯಿಸಿ",
    smart_price_info: "ಬೆಲೆಗಳನ್ನು ರೈತರು ನೇರವಾಗಿ ನಿಗದಿಪಡಿಸಿದ್ದಾರೆ.",
    buy_now: "ಈಗ ಖರೀದಿಸಿ",
    add_to_cart: "➕ ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ",
    remove_from_cart: "❌ ತೆಗೆಯಿರಿ",
    cart_title: "🛒 ನಿಮ್ಮ ಕಾರ್ಟ್",
    cart_empty: "ಕಾರ್ಟ್ ಖಾಲಿ",
    cart_item: "ಐಟಂ",
    cart_items: "ಐಟಂಗಳು",
    enter_qty: "ಪ್ರಮಾಣ",
    undo: "↩ ರದ್ದು",
    redo: "↪ ಮತ್ತೆ",
    place_order: "📦 ಆರ್ಡರ್ ಮಾಡಿ",
    order_placed_ok: "ಆರ್ಡರ್ ಯಶಸ್ವಿ! ಸಾರಿಗೆದಾರರಿಗೆ ಸೂಚನೆ ಕಳುಹಿಸಲಾಗಿದೆ.",
    confirm_buy: "ಈ ಖರೀದಿ ದೃಢೀಕರಿಸಿ?",
    reviews: "ವಿಮರ್ಶೆಗಳು",
    no_reviews: "ಇನ್ನೂ ವಿಮರ್ಶೆಗಳಿಲ್ಲ",
    write_review: "ವಿಮರ್ಶೆ ಬರೆಯಿರಿ",
    review_ph: "ಗುಣಮಟ್ಟದ ಬಗ್ಗೆ ನಿಮ್ಮ ಅನುಭವ ಹಂಚಿಕೊಳ್ಳಿ...",
    submit_review: "ವಿಮರ್ಶೆ ಸಲ್ಲಿಸಿ",
    review_submitted: "ವಿಮರ್ಶೆ ಸಲ್ಲಿಸಲಾಗಿದೆ!",
    rating: "ರೇಟಿಂಗ್",
    stars: "ನಕ್ಷತ್ರ",
    avg_rating: "ಸರಾಸರಿ ರೇಟಿಂಗ್",
    view_reviews: "ವಿಮರ್ಶೆ ನೋಡಿ",
    close: "ಮುಚ್ಚಿ",
    transporter_dashboard: "ಸಾರಿಗೆದಾರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    live_notifications: "🔔 ಲೈವ್ ಡೆಲಿವರಿ ವಿನಂತಿಗಳು",
    no_jobs: "ಪ್ರಸ್ತುತ ಡೆಲಿವರಿ ಕೆಲಸಗಳು ಲಭ್ಯವಿಲ್ಲ.",
    new_request: "🚨 ಹೊಸ ಡೆಲಿವರಿ ವಿನಂತಿ!",
    accept_job: "ಕೆಲಸ ಸ್ವೀಕರಿಸಿ",
    current_job: "ಪ್ರಸ್ತುತ ಕೆಲಸ",
    pickup_farmer: "ಪಿಕಪ್ (ರೈತ)",
    dropoff_buyer: "ಡ್ರಾಪ್-ಆಫ್ (ಖರೀದಿದಾರ)",
    call_farmer: "📞 ರೈತರಿಗೆ ಕರೆ",
    call_buyer: "📞 ಖರೀದಿದಾರರಿಗೆ ಕರೆ",
    view_map: "🗺️ ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ",
    update_status: "ಡೆಲಿವರಿ ಸ್ಥಿತಿ ಅಪ್ಡೇಟ್",
    status_pending: "ಬಾಕಿ",
    status_assigned: "ನಿಯೋಜಿಸಲಾಗಿದೆ",
    status_transit: "ಸಾಗಣೆಯಲ್ಲಿ",
    status_delivered: "ತಲುಪಿದೆ",
    already_delivered: "ಈ ಆರ್ಡರ್ ಈಗಾಗಲೇ ತಲುಪಿದೆ!",
    transporter_assigned: "ಸಾರಿಗೆದಾರ ನಿಯೋಜಿಸಲಾಗಿದೆ!",
    order_tracking: "ಆರ್ಡರ್ ಟ್ರ್ಯಾಕಿಂಗ್",
    your_orders: "ನಿಮ್ಮ ಆರ್ಡರ್‌ಗಳು",
    no_active_orders: "ಸಕ್ರಿಯ ಆರ್ಡರ್‌ಗಳಿಲ್ಲ.",
    auto_assign: "ಡ್ರೈವರ್ ಆಟೋ-ಅಸೈನ್",
    comm_system: "ಸಂವಹನ",
    type_message: "ಸಂದೇಶ ಟೈಪ್ ಮಾಡಿ...",
    calling: "ಕರೆ ಮಾಡುತ್ತಿದೆ...",
    end_call: "ಕರೆ ಕೊನೆಗೊಳಿಸಿ",
    from: "ಇಂದ",
    to: "ಗೆ",
    phone: "ಫೋನ್",
    avail: "ಲಭ್ಯ",
    per_kg: "/ಕೆಜಿ",
    farm: "ಹೊಲ",
    loc_label: "ಸ್ಥಳ",
    total: "ಒಟ್ಟು",
    order_id: "ಆರ್ಡರ್",
    buyer_label: "ಖರೀದಿದಾರ",
    farmer_label: "ರೈತ",
    time_label: "ಸಮಯ",
    select_lang: "ನಿಮ್ಮ ಭಾಷೆ ಆರಿಸಿ",
    select_lang_sub: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆ ಆರಿಸಿ",
  },
  ta: {
    nav_brand: "🌱 ஃபார்ம்கனெக்ட்",
    nav_logout: "வெளியேறு",
    login_btn: "உள்நுழை / பதிவு",
    dashboard_link: "டாஷ்போர்டு",
    chat_link: "செய்தி",
    tagline: "விவசாயிகளுக்கு நேரடி அணுகல்",
    sub_tagline: "சரிபார்க்கப்பட்ட விவசாயிகளுடன் நேரடியாக இணையுங்கள். இடைத்தரகர்கள் இல்லை, நியாயமான விலை.",
    for_farmers: "🚜 விவசாயிகளுக்கு",
    for_farmers_desc: "உங்கள் பயிர்களை நிமிடங்களில் பட்டியலிட்டு நேரடியாக விற்கவும்.",
    for_buyers: "🛒 வாங்குபவர்களுக்கு",
    for_buyers_desc: "வெளிப்படையான விலையுடன் புதிய விளைபொருட்களைப் பெறுங்கள்.",
    for_transporters: "🚚 போக்குவரத்துக்கு",
    for_transporters_desc: "அருகிலுள்ள பிக்கப் அறிவிப்புகளை தானாகப் பெறுங்கள்.",
    get_started: "இப்போதே தொடங்குங்கள்",
    change_lang: "மொழி மாற்றம்",
    welcome_login: "தொலைபேசி எண் மூலம் உள்நுழைக",
    phone_placeholder: "10 இலக்க தொலைபேசி எண்",
    select_role: "உங்கள் பங்கைத் தேர்ந்தெடுக்கவும்",
    choose_role: "-- பங்கு தேர்வு --",
    role_farmer: "விவசாயி (விற்பனை)",
    role_buyer: "வாங்குபவர் (கொள்முதல்)",
    role_transporter: "போக்குவரத்து (டெலிவரி)",
    proto_note: "முன்மாதிரி பயன்முறை: OTP தானியங்கு",
    farmer_dashboard: "விவசாயி டாஷ்போர்டு",
    list_crop: "புதிய பயிர் சேர்",
    crop_name: "பயிர் பெயர்",
    crop_name_ph: "எ.கா. தக்காளி",
    or_upload: "அல்லது AI கண்டறிய படம் பதிவேற்றவும்",
    ai_detecting: "🤖 AI பயிரை கண்டறிகிறது...",
    ai_detected: "🤖 AI கண்டறிந்தது",
    qty: "கிடைக்கும் அளவு",
    qty_ph: "எ.கா. 100",
    unit: "அலகு",
    price: "ஒரு கிலோ விலை (₹)",
    price_ph: "எ.கா. 40",
    loc: "இடம்",
    loc_auto: "📍 இடம் கண்டறிகிறது...",
    loc_detected: "📍 இடம் கண்டறியப்பட்டது!",
    submit_list: "✅ பயிர் சேர்",
    your_listings: "உங்கள் பயிர் பட்டியல்",
    no_listings: "நீங்கள் இதுவரை எந்த பயிரையும் பட்டியலிடவில்லை.",
    incoming_orders: "வந்த ஆர்டர்கள்",
    no_orders: "இதுவரை ஆர்டர் இல்லை.",
    crop_listed_ok: "பயிர் வெற்றிகரமாக சேர்க்கப்பட்டது!",
    market_title: "புதிய விளைபொருட்கள் சந்தை",
    no_middlemen: "🤝 இடைத்தரகர்கள் இல்லை - நியாயமான விலை!",
    search_ph: "🔍 பயிர் தேடுங்கள்...",
    filters: "வடிப்பான்கள்",
    crop_type: "பயிர் வகை",
    all: "அனைத்தும்",
    vegetables: "காய்கறிகள்",
    fruits: "பழங்கள்",
    grains: "தானியங்கள்",
    max_price: "அதிகபட்ச விலை (₹)",
    apply_filters: "வடிப்பான் பயன்படுத்து",
    smart_price_info: "விலை நேரடியாக விவசாயிகளால் நிர்ணயிக்கப்படுகிறது.",
    buy_now: "இப்போது வாங்கு",
    add_to_cart: "➕ கார்ட்டில் சேர்",
    remove_from_cart: "❌ நீக்கு",
    cart_title: "🛒 உங்கள் கார்ட்",
    cart_empty: "கார்ட் காலியாக உள்ளது",
    cart_item: "பொருள்",
    cart_items: "பொருட்கள்",
    enter_qty: "அளவு",
    undo: "↩ செயல்தவிர்",
    redo: "↪ மீண்டும்",
    place_order: "📦 ஆர்டர் செய்",
    order_placed_ok: "ஆர்டர் வெற்றி! போக்குவரத்துக்கு அறிவிப்பு அனுப்பப்பட்டது.",
    confirm_buy: "இந்த கொள்முதலை உறுதிப்படுத்தவா?",
    reviews: "விமர்சனங்கள்",
    no_reviews: "விமர்சனங்கள் இல்லை",
    write_review: "விமர்சனம் எழுதுங்கள்",
    review_ph: "தரம் பற்றிய உங்கள் அனுபவத்தை பகிரவும்...",
    submit_review: "விமர்சனம் சமர்ப்பி",
    review_submitted: "விமர்சனம் சேர்க்கப்பட்டது!",
    rating: "மதிப்பீடு",
    stars: "நட்சத்திரம்",
    avg_rating: "சராசரி மதிப்பீடு",
    view_reviews: "விமர்சனங்கள் பார்",
    close: "மூடு",
    transporter_dashboard: "போக்குவரத்து டாஷ்போர்டு",
    live_notifications: "🔔 நேரடி டெலிவரி கோரிக்கைகள்",
    no_jobs: "தற்போது டெலிவரி வேலைகள் இல்லை.",
    new_request: "🚨 புதிய டெலிவரி கோரிக்கை!",
    accept_job: "வேலை ஏற்க",
    current_job: "தற்போதைய வேலை",
    pickup_farmer: "பிக்கப் (விவசாயி)",
    dropoff_buyer: "டிராப் (வாங்குபவர்)",
    call_farmer: "📞 விவசாயியை அழை",
    call_buyer: "📞 வாங்குபவரை அழை",
    view_map: "🗺️ வரைபடத்தில் காண்",
    update_status: "டெலிவரி நிலை புதுப்பி",
    status_pending: "நிலுவை",
    status_assigned: "ஒதுக்கப்பட்டது",
    status_transit: "போக்குவரத்தில்",
    status_delivered: "வழங்கப்பட்டது",
    already_delivered: "இந்த ஆர்டர் ஏற்கனவே வழங்கப்பட்டது!",
    transporter_assigned: "போக்குவரத்து ஒதுக்கப்பட்டது!",
    order_tracking: "ஆர்டர் கண்காணிப்பு",
    your_orders: "உங்கள் ஆர்டர்கள்",
    no_active_orders: "செயலில் உள்ள ஆர்டர்கள் இல்லை.",
    auto_assign: "டிரைவர் ஒதுக்கு",
    comm_system: "தொடர்பு",
    type_message: "செய்தி தட்டச்சு செய்யவும்...",
    calling: "அழைக்கிறது...",
    end_call: "அழைப்பை நிறுத்து",
    from: "இருந்து",
    to: "க்கு",
    phone: "தொலைபேசி",
    avail: "கிடைக்கும்",
    per_kg: "/கிலோ",
    farm: "பண்ணை",
    loc_label: "இடம்",
    total: "மொத்தம்",
    order_id: "ஆர்டர்",
    buyer_label: "வாங்குபவர்",
    farmer_label: "விவசாயி",
    time_label: "நேரம்",
    select_lang: "உங்கள் மொழியை தேர்வு செய்க",
    select_lang_sub: "உங்கள் விருப்பமான மொழியை தேர்ந்தெடுக்கவும்",
  },
  ml: {
    nav_brand: "🌱 ഫാംകണക്ട്",
    nav_logout: "ലോഗ്ഔട്ട്",
    login_btn: "ലോഗിൻ / രജിസ്റ്റർ",
    dashboard_link: "ഡാഷ്ബോർഡ്",
    chat_link: "ചാറ്റ്",
    tagline: "കർഷകർക്ക് നേരിട്ടുള്ള പ്രവേശനം",
    sub_tagline: "പരിശോധിച്ച കർഷകരുമായി നേരിട്ട് ബന്ധപ്പെടുക. ഇടനിലക്കാരില്ല, ന്യായമായ വില.",
    for_farmers: "🚜 കർഷകർക്ക്",
    for_farmers_desc: "നിങ്ങളുടെ വിളകൾ മിനിറ്റുകളിൽ ലിസ്റ്റ് ചെയ്ത് നേരിട്ട് വിൽക്കുക.",
    for_buyers: "🛒 വാങ്ങുന്നവർക്ക്",
    for_buyers_desc: "സുതാര്യമായ വിലയിൽ പുതിയ ഉൽപ്പന്നങ്ങൾ നേടുക.",
    for_transporters: "🚚 ട്രാൻസ്പോർട്ടർമാർക്ക്",
    for_transporters_desc: "അടുത്തുള്ള പിക്കപ്പ് അറിയിപ്പുകൾ ഓട്ടോമാറ്റിക്കായി ലഭിക്കുക.",
    get_started: "ഇന്ന് തുടങ്ങാം",
    change_lang: "ഭാഷ മാറ്റുക",
    welcome_login: "ഫോൺ നമ്പർ ഉപയോഗിച്ച് ലോഗിൻ",
    phone_placeholder: "10 അക്ക ഫോൺ നമ്പർ",
    select_role: "നിങ്ങളുടെ റോൾ തിരഞ്ഞെടുക്കുക",
    choose_role: "-- റോൾ തിരഞ്ഞെടുക്കുക --",
    role_farmer: "കർഷകൻ (വിൽക്കുക)",
    role_buyer: "വാങ്ങുന്നയാൾ (വാങ്ങുക)",
    role_transporter: "ട്രാൻസ്പോർട്ടർ (ഡെലിവറി)",
    proto_note: "പ്രോട്ടോടൈപ്പ് മോഡ്: OTP ഓട്ടോമാറ്റിക്",
    farmer_dashboard: "കർഷക ഡാഷ്ബോർഡ്",
    list_crop: "പുതിയ വിള ചേർക്കുക",
    crop_name: "വിളയുടെ പേര്",
    crop_name_ph: "ഉദാ. തക്കാളി",
    or_upload: "അല്ലെങ്കിൽ AI കണ്ടെത്തലിനായി ചിത്രം അപ്ലോഡ് ചെയ്യുക",
    ai_detecting: "🤖 AI വിള കണ്ടെത്തുന്നു...",
    ai_detected: "🤖 AI കണ്ടെത്തി",
    qty: "ലഭ്യമായ അളവ്",
    qty_ph: "ഉദാ. 100",
    unit: "യൂണിറ്റ്",
    price: "ഒരു കിലോ വില (₹)",
    price_ph: "ഉദാ. 40",
    loc: "സ്ഥലം",
    loc_auto: "📍 സ്ഥലം കണ്ടെത്തുന്നു...",
    loc_detected: "📍 സ്ഥലം കണ്ടെത്തി!",
    submit_list: "✅ വിള ചേർക്കുക",
    your_listings: "നിങ്ങളുടെ ലിസ്റ്റ് ചെയ്ത വിളകൾ",
    no_listings: "നിങ്ങൾ ഇതുവരെ ഒരു വിളയും ലിസ്റ്റ് ചെയ്തിട്ടില്ല.",
    incoming_orders: "ഓർഡറുകൾ",
    no_orders: "ഇതുവരെ ഓർഡറുകൾ ലഭിച്ചിട്ടില്ല.",
    crop_listed_ok: "വിള വിജയകരമായി ചേർത്തു!",
    market_title: "പുതിയ ഉൽപ്പന്ന മാർക്കറ്റ്",
    no_middlemen: "🤝 ഇടനിലക്കാരില്ല - ന്യായ വില!",
    search_ph: "🔍 വിള തിരയുക...",
    filters: "ഫിൽട്ടറുകൾ",
    crop_type: "വിള തരം",
    all: "എല്ലാം",
    vegetables: "പച്ചക്കറികൾ",
    fruits: "പഴങ്ങൾ",
    grains: "ധാന്യങ്ങൾ",
    max_price: "പരമാവധി വില (₹)",
    apply_filters: "ഫിൽട്ടർ  ഉപയോഗിക്കുക",
    smart_price_info: "വില കർഷകർ നേരിട്ട് നിശ്ചയിക്കുന്നു.",
    buy_now: "ഇപ്പോൾ വാങ്ങുക",
    add_to_cart: "➕ കാർട്ടിൽ ചേർക്കുക",
    remove_from_cart: "❌ നീക്കം",
    cart_title: "🛒 നിങ്ങളുടെ കാർട്ട്",
    cart_empty: "കാർട്ട് ശൂന്യം",
    cart_item: "ഇനം",
    cart_items: "ഇനങ്ങൾ",
    enter_qty: "അളവ്",
    undo: "↩ പഴയപടി",
    redo: "↪ വീണ്ടും",
    place_order: "📦 ഓർഡർ ചെയ്യുക",
    order_placed_ok: "ഓർഡർ വിജയം! ട്രാൻസ്പോർട്ടർക്ക് അറിയിപ്പ് അയച്ചു.",
    confirm_buy: "ഈ വാങ്ങൽ ഉറപ്പാക്കണോ?",
    reviews: "അവലോകനങ്ങൾ",
    no_reviews: "ഇതുവരെ അവലോകനങ്ങൾ ഇല്ല",
    write_review: "അവലോകനം എഴുതുക",
    review_ph: "ഗുണനിലവാരത്തെക്കുറിച്ച് അനുഭവം പങ്കിടുക...",
    submit_review: "അവലോകനം സമർപ്പിക്കുക",
    review_submitted: "അവലോകനം ചേർത്തു!",
    rating: "റേറ്റിംഗ്",
    stars: "നക്ഷത്രം",
    avg_rating: "ശരാശരി റേറ്റിംഗ്",
    view_reviews: "അവലോകനങ്ങൾ കാണുക",
    close: "അടയ്ക്കുക",
    transporter_dashboard: "ട്രാൻസ്പോർട്ടർ ഡാഷ്ബോർഡ്",
    live_notifications: "🔔 ലൈവ് ഡെലിവറി അഭ്യർത്ഥനകൾ",
    no_jobs: "ഇപ്പോൾ ഡെലിവറി ജോലികൾ ഇല്ല.",
    new_request: "🚨 പുതിയ ഡെലിവറി അഭ്യർത്ഥന!",
    accept_job: "ജോലി സ്വീകരിക്കുക",
    current_job: "നിലവിലെ ജോലി",
    pickup_farmer: "പിക്കപ്പ് (കർഷകൻ)",
    dropoff_buyer: "ഡ്രോപ്പ് (വാങ്ങുന്നയാൾ)",
    call_farmer: "📞 കർഷകനെ വിളിക്കുക",
    call_buyer: "📞 വാങ്ങുന്നയാളെ വിളിക്കുക",
    view_map: "🗺️ മാപ്പിൽ കാണുക",
    update_status: "ഡെലിവറി സ്റ്റാറ്റസ് അപ്ഡേറ്റ്",
    status_pending: "തീർപ്പുള്ള",
    status_assigned: "നിയമിച്ചു",
    status_transit: "ഗതാഗതത്തിൽ",
    status_delivered: "ഡെലിവർ ചെയ്തു",
    already_delivered: "ഈ ഓർഡർ ഇതിനകം ഡെലിവർ ചെയ്തു!",
    transporter_assigned: "ട്രാൻസ്പോർട്ടർ നിയമിച്ചു!",
    order_tracking: "ഓർഡർ ട്രാക്കിംഗ്",
    your_orders: "നിങ്ങളുടെ ഓർഡറുകൾ",
    no_active_orders: "സജീവ ഓർഡറുകൾ ഇല്ല.",
    auto_assign: "ഡ്രൈവർ ഓട്ടോ-അസൈൻ",
    comm_system: "ആശയവിനിമയം",
    type_message: "സന്ദേശം ടൈപ്പ് ചെയ്യുക...",
    calling: "വിളിക്കുന്നു...",
    end_call: "കോൾ അവസാനിപ്പിക്കുക",
    from: "ഇൽ നിന്ന്",
    to: "ലേക്ക്",
    phone: "ഫോൺ",
    avail: "ലഭ്യം",
    per_kg: "/കിലോ",
    farm: "ഫാം",
    loc_label: "സ്ഥലം",
    total: "ആകെ",
    order_id: "ഓർഡർ",
    buyer_label: "വാങ്ങുന്നയാൾ",
    farmer_label: "കർഷകൻ",
    time_label: "സമയം",
    select_lang: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക",
    select_lang_sub: "നിങ്ങൾ ഇഷ്ടപ്പെടുന്ന ഭാഷ തിരഞ്ഞെടുക്കുക",
  }
};

// --- DATABASE UTILITIES ---
const DB = {
  init() {
    if (!localStorage.getItem('fc_crops')) {
      localStorage.setItem('fc_crops', JSON.stringify(INITIAL_CROPS));
    }
    if (!localStorage.getItem('fc_orders')) {
      localStorage.setItem('fc_orders', JSON.stringify([]));
    }
    if (!localStorage.getItem('fc_chats')) {
      localStorage.setItem('fc_chats', JSON.stringify([
        { text: "Hello! Is the wheat still available?", isLocal: false },
        { text: "Yes it is. How much do you need?", isLocal: true }
      ]));
    }
    if (!localStorage.getItem('farmLang')) {
      if (!window.location.href.includes('language.html')) {
        window.location.href = 'language.html';
      }
    }
  },
  // Language
  setLang(code) { localStorage.setItem('farmLang', code); },
  getLang() { return localStorage.getItem('farmLang') || 'en'; },
  t(key) {
    const lang = this.getLang();
    const dict = I18N[lang] || I18N['en'];
    return dict[key] || I18N['en'][key] || key;
  },
  translateUI() {
    const lang = this.getLang();
    const dict = I18N[lang] || I18N['en'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = dict[key];
        } else if (el.tagName === 'OPTION') {
          el.textContent = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });
  },
  // Crops
  getCrops() { 
    let crops = JSON.parse(localStorage.getItem('fc_crops')) || [];
    // Always ensure Wheat is present for testing as per user request
    if (!crops.some(c => c.name.toLowerCase().includes('wheat'))) {
      crops.push({
        id: 9999, name: "Premium Golden Wheat", category: "major", farmer: "M.S. Swaminathan Farm", phone: "9000000001", 
        quantity: 1000, unit: "kg", price: 28, desc: "Direct from experimental seed stock.", loc: "New Delhi", 
        lat: 28.61, lng: 77.23, img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80", reviews: []
      });
    }
    return crops; 
  },
  addCrop(crop) {
    const crops = this.getCrops();
    crop.id = Date.now();
    crop.reviews = [];
    crops.push(crop);
    localStorage.setItem('fc_crops', JSON.stringify(crops));
  },
  addReview(cropId, review) {
    const crops = this.getCrops();
    const c = crops.find(x => x.id == cropId);
    if (c) {
      if (!c.reviews) c.reviews = [];
      c.reviews.push(review);
      localStorage.setItem('fc_crops', JSON.stringify(crops));
    }
  },
  // Orders
  getOrders() { return JSON.parse(localStorage.getItem('fc_orders')); },
  addOrder(order) {
    const orders = this.getOrders();
    order.id = Date.now();
    order.status = "Pending";
    order.paymentStatus = order.paymentStatus || "Pending";
    order.transportCharges = order.dist ? Math.ceil(order.dist * 0.5) : 50; // Simple calculation
    order.transporter = null;
    order.eta = null;
    order.time = new Date().toLocaleTimeString();
    orders.push(order);
    localStorage.setItem('fc_orders', JSON.stringify(orders));
    
    // Auto-Simulate Transporter Acceptance after 3 seconds
    setTimeout(() => {
      this.simulateTransporterAcceptance(order.id);
    }, 3000);
  },
  updateOrderStatus(orderId, status) {
    const orders = this.getOrders();
    const o = orders.find(x => x.id == orderId);
    if (o) { o.status = status; localStorage.setItem('fc_orders', JSON.stringify(orders)); }
  },
  updatePaymentStatus(orderId, status) {
    const orders = this.getOrders();
    const o = orders.find(x => x.id == orderId);
    if (o) { o.paymentStatus = status; localStorage.setItem('fc_orders', JSON.stringify(orders)); }
  },
  simulateTransporterAcceptance(orderId) {
    const orders = this.getOrders();
    const o = orders.find(x => x.id == orderId);
    if (o && o.status === "Pending") {
      o.status = "Assigned";
      o.transporter = {
        name: "Express Logistics",
        phone: "9123456789",
        vehicle: "Eicher 14ft",
        rating: 4.8
      };
      o.eta = "45 mins";
      localStorage.setItem('fc_orders', JSON.stringify(orders));
    }
  },
  // Chats
  getChats() { return JSON.parse(localStorage.getItem('fc_chats')); },
  addMessage(text, isLocal) {
    const chats = this.getChats();
    chats.push({ text, isLocal });
    localStorage.setItem('fc_chats', JSON.stringify(chats));
  },
  // Session
  setUserSession(role, phone) {
    localStorage.setItem('fc_user', JSON.stringify({ role, phone, name: "User_" + phone.substring(0, 4) }));
  },
  getUserSession() { return JSON.parse(localStorage.getItem('fc_user')); },
  logout() { localStorage.removeItem('fc_user'); window.location.href = 'index.html'; }
};

DB.init();

// --- AUTH NAVBAR ---
function checkAuth(requiredRole = null) {
  const user = DB.getUserSession();
  const authNav = document.getElementById('auth-nav');
  if (authNav) {
    if (user) {
      let dashLink = "buyer.html";
      if (user.role === 'Farmer') dashLink = "farmer.html";
      if (user.role === 'Transporter') dashLink = "transporter.html";
      authNav.innerHTML = `
        <a href="${dashLink}" class="badge badge-success" style="color:var(--dark-green);padding:0.5rem 1rem;">
          <span data-i18n="dashboard_link">${DB.t('dashboard_link')}</span> (${user.role})
        </a>
        <a href="chat.html" style="margin-left:1rem;" data-i18n="chat_link">${DB.t('chat_link')}</a>
        <a href="tracking.html" style="margin-left:1rem;" data-i18n="order_tracking">${DB.t('order_tracking')}</a>
        <a href="#" onclick="DB.logout()" style="margin-left:1rem;" data-i18n="nav_logout">${DB.t('nav_logout')}</a>`;
    } else {
      authNav.innerHTML = `<a href="login.html" class="btn btn-secondary" style="padding:0.5rem 1rem;" data-i18n="login_btn">${DB.t('login_btn')}</a>`;
    }
  }
  if (requiredRole && (!user || user.role !== requiredRole)) {
    window.location.href = 'login.html';
  }
  DB.translateUI();
  return user;
}

// --- CALL SIMULATION ---
function simulateCall(phoneNumber) {
  if (!document.getElementById('callOverlay')) {
    const ov = document.createElement('div');
    ov.id = 'callOverlay';
    ov.className = 'call-overlay';
    ov.innerHTML = `
      <div class="call-modal">
        <div class="pulsing-circle mb-2"></div>
        <h3 style="color:white;margin-bottom:.5rem;" data-i18n="calling">${DB.t('calling')}</h3>
        <p style="color:#ddd;font-size:1.5rem;" id="callNumberDisplay"></p>
        <button class="btn mt-3" style="background:#d32f2f;color:white;" onclick="endCall()" data-i18n="end_call">${DB.t('end_call')}</button>
      </div>`;
    document.body.appendChild(ov);
  }
  document.getElementById('callNumberDisplay').textContent = "+91 " + phoneNumber;
  document.getElementById('callOverlay').style.display = 'flex';
}
function endCall() {
  const ov = document.getElementById('callOverlay');
  if (ov) ov.style.display = 'none';
}

// --- GPS LOCATION ---
function autoDetectLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        callback({ lat: pos.coords.latitude, lng: pos.coords.longitude, text: pos.coords.latitude.toFixed(2) + ", " + pos.coords.longitude.toFixed(2) });
      },
      () => {
        // Fallback mock location
        callback({ lat: 12.97, lng: 77.59, text: "Bengaluru, KA (mock)" });
      }
    );
  } else {
    callback({ lat: 12.97, lng: 77.59, text: "Bengaluru, KA (mock)" });
  }
}

// --- MAP POPUP ---
function showMapPopup(lat, lng, label) {
  if (!document.getElementById('mapOverlay')) {
    const ov = document.createElement('div');
    ov.id = 'mapOverlay';
    ov.className = 'call-overlay';
    ov.innerHTML = `
      <div style="background:white;border-radius:12px;overflow:hidden;width:90%;max-width:700px;height:500px;position:relative;">
        <button onclick="closeMap()" style="position:absolute;top:10px;right:10px;z-index:10;background:#d32f2f;color:white;border:none;padding:0.5rem 1rem;border-radius:8px;cursor:pointer;" data-i18n="close">${DB.t('close')}</button>
        <iframe id="mapFrame" width="100%" height="100%" style="border:0;" loading="lazy" allowfullscreen></iframe>
      </div>`;
    document.body.appendChild(ov);
  }
  document.getElementById('mapFrame').src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.05},${lat - 0.05},${lng + 0.05},${lat + 0.05}&layer=mapnik&marker=${lat},${lng}`;
  document.getElementById('mapOverlay').style.display = 'flex';
}
function closeMap() {
  const ov = document.getElementById('mapOverlay');
  if (ov) ov.style.display = 'none';
}
