import React from 'react';
import { 
  Search, 
  ShieldCheck, 
  MessageSquare, 
  SlidersHorizontal, 
  MapPin, 
  Home, 
  Wallet, 
  CheckCircle2, 
  Heart, 
  Bed, 
  Bath, 
  Zap, 
  ArrowRight, 
  Building2, 
  UserCheck, 
  FileText, 
  Lock 
} from 'lucide-react';

export default function HuntifiedLanding() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      
           <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 text-white p-2 rounded-xl font-bold flex items-center justify-center">
                <Home className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">Huntified</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full font-medium border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              AFRICA'S AUDITED RENTAL NETWORK • 10 ACTIVE MARKETS
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="text-emerald-600 font-semibold">Home</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Find a Home</a>
            <a href="#" className="hover:text-slate-900 transition-colors">How It Works</a>
            <a href="#" className="hover:text-slate-900 transition-colors">For Landlords</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Dashboard</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-600 hover:text-slate-900">
              <Search className="w-5 h-5" />
            </button>
            <button className="hidden sm:flex items-center gap-2 text-xs font-semibold bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-sm">
              Post Property
            </button>
            <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 overflow-hidden">
              <img src="image/container.png" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Listings
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                AI Transparent costs
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100">
                Direct communication
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Find a home <br />
              <span className="text-emerald-600">you can trust.</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-xl">
              Discover verified rental properties, understand your true move-in cost, and connect directly with landlords — all in one place.
            </p>

            <div className="bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> Location
                  </div>
                  <div className="text-sm font-medium text-slate-900 truncate">
                    Select city (e.g. Lagos, Nairobi, Accra, Johannesburg, Kigali)
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    <Home className="w-3.5 h-3.5 text-slate-500" /> Property Type
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    All Properties
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    <Wallet className="w-3.5 h-3.5 text-slate-500" /> Max Budget
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    Up to ₦5,000,000 /yr
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300" />
                  <span className="text-xs font-semibold text-slate-700">Verified listings only (Zero-Fraud Filter)</span>
                </label>

                <button className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-all text-sm">
                  <Search className="w-4 h-4" /> Find a Home
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-200/60">
              <div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">1,480+</div>
                <div className="text-xs text-slate-500 font-medium">In-Person Audited homes</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">10</div>
                <div className="text-xs text-slate-500 font-medium">Supported Countries</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">100%</div>
                <div className="text-xs text-slate-500 font-medium">Escrow Protected Rent</div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              <img 
                src="image/Main Architectural Canvas.png" lt="Luxury Villa"  className="w-full h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"  />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-white/20 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold text-slate-900">AI Fraud Scan Passed <span className="text-emerald-600 font-extrabold">99.8%</span></span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-3">
                <div className="inline-block bg-emerald-600 text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md uppercase">
                  Verified Signature Property
                </div>
                <div className="text-white font-bold text-lg">
                  The Azure Villa • Admiralty Way, Lekki
                </div>
                <p className="text-xs text-slate-300">
                  Physical inspection authenticated 28 hrs ago by Huntified Field Agent #204
                </p>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 flex items-center gap-2 text-xs text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No Hidden Agency Fees <span className="opacity-75 font-normal">Every single lease itemized upfront</span></span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="bg-white py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Engineered for Certainty</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-2">
                The Three Guardrails of Huntified
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-slate-600 text-base leading-relaxed">
                African rental discovery has been plagued by impostors, phantom inspection levies, and obscured total fees. We completely restructured the mechanism.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl space-y-4 hover:shadow-xl hover:bg-white transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">1. Zero Fake Listings</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every listing is subjected to an AI-verified title check against state lands registries, followed by physical geolocation tagging by vetted field agents.
              </p>
              <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> In-person biometric agent inspection tag
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl space-y-4 hover:shadow-xl hover:bg-white transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">2. True Move-In Cost</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Never get ambushed by surprise agent percentages. We mandate full disclosure of caution deposits, service charges, and state stamp duties before inspection.
              </p>
              <div className="pt-2 text-xs font-semibold text-blue-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Zero surprises on Day-1 checkout
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl space-y-4 hover:shadow-xl hover:bg-white transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">3. Direct Landlord Chat</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Bypass informal street intermediaries and extortionate double-agent fees. Chat directly with verified property owners or corporate estate managers.
              </p>
              <div className="pt-2 text-xs font-semibold text-purple-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Escrow protected rent deposit release
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Physical Audit Complete</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-2">
              Featured & Verified
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Explore properties that have passed Huntified's rigorous verification process with zero discrepancies recorded.
            </p>
          </div>
          <a href="#" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            View all 1,480+ verified listings across Africa <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all">
            <div className="relative h-60">
              <img src="image/pic 1 landing page.jpg" alt="Property" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-md">VERIFIED</div>
              <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-700 hover:text-red-500 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white font-black text-sm px-3 py-1.5 rounded-xl">
                ₦4,500,000 <span className="text-xs font-normal opacity-75">/yr</span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-600 font-bold uppercase tracking-wider">Serviced Apartment</span>
                <span className="text-slate-600 font-semibold flex items-center gap-1">★ 4.9 <span className="text-slate-400 font-normal">(34 reviews)</span></span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">Luxury 3-Bedroom Serviced Apartment</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Victoria Island, Lagos, Nigeria
              </p>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center">
                <div>
                  <div className="text-xs font-bold text-slate-900">3</div>
                  <div className="text-[10px] text-slate-400">Beds</div>
                </div>
                <div className="border-x border-slate-100">
                  <div className="text-xs font-bold text-slate-900">3.5</div>
                  <div className="text-[10px] text-slate-400">Baths</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-600">24/7</div>
                  <div className="text-[10px] text-slate-400">Power</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">True Move-in Est.</div>
                  <div className="text-sm font-extrabold text-slate-900">₦5,175,000</div>
                </div>
                <button className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors">
                  View Property
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all">
            <div className="relative h-60">
              <img src="image/pic 2 landing page.jpg" alt="Property" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-md">VERIFIED</div>
              <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-700 hover:text-red-500 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white font-black text-sm px-3 py-1.5 rounded-xl">
                $18,000 <span className="text-xs font-normal opacity-75">/yr</span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-600 font-bold uppercase tracking-wider">Waterfront Suite</span>
                <span className="text-slate-600 font-semibold flex items-center gap-1">★ 4.9 <span className="text-slate-400 font-normal">(28 reviews)</span></span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">Modern 2-Bedroom Waterfront Suite</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Cantonments, Accra, Ghana
              </p>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center">
                <div>
                  <div className="text-xs font-bold text-slate-900">2</div>
                  <div className="text-[10px] text-slate-400">Beds</div>
                </div>
                <div className="border-x border-slate-100">
                  <div className="text-xs font-bold text-slate-900">2</div>
                  <div className="text-[10px] text-slate-400">Baths</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-600">Pool</div>
                  <div className="text-[10px] text-slate-400">Access</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">True Move-in Est.</div>
                  <div className="text-sm font-extrabold text-slate-900">$20,700</div>
                </div>
                <button className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors">
                  View Property
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all">
            <div className="relative h-60">
              <img src="image/pic 3 landing page.jpg" alt="Property" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-md">VERIFIED</div>
              <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-700 hover:text-red-500 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white font-black text-sm px-3 py-1.5 rounded-xl">
                KSh 2,400,000 <span className="text-xs font-normal opacity-75">/yr</span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-600 font-bold uppercase tracking-wider">Terrace Duplex</span>
                <span className="text-slate-600 font-semibold flex items-center gap-1">★ 5.0 <span className="text-slate-400 font-normal">(21 reviews)</span></span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">Spacious 4-Bedroom Terrace Duplex</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Westlands, Nairobi, Kenya
              </p>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center">
                <div>
                  <div className="text-xs font-bold text-slate-900">4</div>
                  <div className="text-[10px] text-slate-400">Beds</div>
                </div>
                <div className="border-x border-slate-100">
                  <div className="text-xs font-bold text-slate-900">4.5</div>
                  <div className="text-[10px] text-slate-400">Baths</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-600">Solar</div>
                  <div className="text-[10px] text-slate-400">Backup</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">True Move-in Est.</div>
                  <div className="text-sm font-extrabold text-slate-900">KSh 2,760,000</div>
                </div>
                <button className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors">
                  View Property
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Transparent Math</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-2">
                  Know your True Move-In Cost before paying.
                </h2>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                In Lagos and Abuja, a "₦3,000,000" rent tag frequently metastasizes into ₦4,800,000 after unauthorized agent cuts, undisclosed legal charges, and bloated damages security. Huntified locks down a binding cost breakdown.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Deed & Title Verification</h4>
                    <p className="text-xs text-slate-500">Cross-checked via state land administration databases.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">In-Person Technical Audit</h4>
                    <p className="text-xs text-slate-500">Water pressure, electricity sub-meters, and structural safety checked.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Escrow Custody Holding</h4>
                    <p className="text-xs text-slate-500">Funds only released to landlord after key-exchange and move-in inspection sign-off.</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Live Simulation</span>
                  <h3 className="text-lg font-bold text-slate-900">Move-In Breakdown</h3>
                </div>
                <span className="text-xs font-bold bg-slate-200/80 text-slate-700 px-3 py-1 rounded-lg">STANDARD LEASE</span>
              </div>

              <div className="py-6 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Base Annual Rent :</span>
                  <span className="font-black text-slate-900 text-base">₦4,500,000</span>
                </div>

                <div className="space-y-1">
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-500 w-3/4"></div>
                    <div className="bg-amber-400 w-1/4"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>₦2.5M</span>
                    <span>₦5.0M</span>
                    <span>₦7.5M</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Base Rent (Annual)</span>
                    <span className="font-semibold text-slate-900">₦4,500,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Refundable Caution Deposit (10%)</span>
                    <span className="font-semibold text-emerald-600 flex items-center gap-1">₦450,000 <CheckCircle2 className="w-3.5 h-3.5" /></span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Legal & Tenancy Agreement (5%)</span>
                    <span className="font-semibold text-slate-900">₦225,000</span>
                  </div>
                  <div className="flex justify-between items-center bg-emerald-50/80 p-3 rounded-xl border border-emerald-100">
                    <span className="text-emerald-800 font-medium text-xs">Huntified Agency Fee Ceiling <span className="bg-emerald-200 text-emerald-900 text-[9px] px-1.5 py-0.5 rounded font-bold ml-1">Capped at 0%</span></span>
                    <span className="font-extrabold text-emerald-700">₦0 <span className="text-[10px] font-normal underline">(Direct Host)</span></span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-between items-center bg-slate-900 text-white p-5 rounded-2xl shadow-lg">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Total Cash Required on Day 1</div>
                    <div className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-0.5"><ShieldCheck className="w-3.5 h-3.5" /> Full Escrow Protection Included</div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">₦5,175,000</div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 relative overflow-hidden text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

          <div className="space-y-4 max-w-xl relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Building2 className="w-3.5 h-3.5" /> For Property Owners & Asset Managers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Own verified residential property in Lagos or Abuja?
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connect directly with diaspora professionals, tech executives, and corporate tenants. Zero inspection hustle, zero default anxiety, and automatic escrow disbursement.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-300 pt-2">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Direct Payouts in 24 Hours</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free High-Res 3D Virtual Tour</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Rigorous Tenant KYC</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto relative z-10">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-emerald-600/20 text-center">
              List Your Property
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-2xl text-sm transition-all backdrop-blur-md border border-white/10 text-center">
              Explore Landlord Portal
            </button>
          </div>

        </div>
      </section>

      <footer className="bg-white border-t border-slate-100 pt-16 pb-12 mt-12 text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-100">

            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-600 text-white p-1.5 rounded-lg font-bold flex items-center justify-center">
                  <Home className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">Huntified</span>
              </div>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                Venture-backed real estate escrow and physical verification infrastructure for high-growth African metropolises. We eliminate rental fraud with verified inventory, transparent cost schedules, and escrow safety.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">HUNTERS</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-slate-900">Verified Listings</a></li>
                <li><a href="#" className="hover:text-slate-900">Lekki & Ikoyi Rentals</a></li>
                <li><a href="#" className="hover:text-slate-900">Abuja Diplomatic Zone</a></li>
                <li><a href="#" className="hover:text-slate-900">True Move-In Calculator</a></li>
                <li><a href="#" className="hover:text-slate-900">Rent Protection Escrow</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">LANDLORDS</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-slate-900">List Unoccupied Property</a></li>
                <li><a href="#" className="hover:text-slate-900">Landlord Tier Status</a></li>
                <li><a href="#" className="hover:text-slate-900">Guaranteed Instant Payouts</a></li>
                <li><a href="#" className="hover:text-slate-900">Physical Inspection Protocol</a></li>
                <li><a href="#" className="hover:text-slate-900">Diaspora Host Portal</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">TRUST & LEGAL</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-slate-900">AI Verification Hub</a></li>
                <li><a href="#" className="hover:text-slate-900">Title Deed Screening</a></li>
                <li><a href="#" className="hover:text-slate-900">Escrow Custody Terms</a></li>
                <li><a href="#" className="hover:text-slate-900">Terms of Service</a></li>
                <li><a href="#" className="hover:text-slate-900">Privacy & NDPR Compliance</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div>© 2026 Huntified Technologies Inc. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Audit Live across 10 African Markets</span>
              <span>RC-7839204</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
document.querySelectorAll('.relative button').forEach(button => {
   const icon = button.querySelector('[data-lucide="heart"]') || button.querySelector('svg'); 
  if (icon && button.querySelector('[data-lucide="heart"], svg')) {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      button.classList.toggle('text-red-500');
      const svgIcon = button.querySelector('svg');
      if (svgIcon) {
        svgIcon.classList.toggle('text-red-500');
        svgIcon.classList.toggle('fill-red-500');
      }
    });
  }
});
document.querySelectorAll('.favorite-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    btn.classList.toggle('text-red-500');
    const svg = btn.querySelector('svg');
    if (svg) {
      svg.classList.toggle('fill-red-500');
    }
  });
});