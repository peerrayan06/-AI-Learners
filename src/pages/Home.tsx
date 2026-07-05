import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Box, Sparkles, GraduationCap, Bot, Globe, Palette, Music, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full flex-grow flex flex-col bg-background relative overflow-hidden">
      {/* Liquid Hero Section */}
      <section className="relative w-full bg-cyber-yellow rounded-b-[30px] md:rounded-bl-[80px] md:rounded-br-[160px] pt-8 pb-16 md:pt-12 md:pb-40 px-4 md:px-12 flex flex-col items-center justify-center z-10 transition-all duration-700 ease-in-out">
        <div className="w-full max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          <div className="w-full md:w-[60%] flex flex-col gap-6 md:gap-8 z-10">
            <div className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-black/5 border border-black/10 w-fit">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-black animate-pulse"></span>
              <span className="text-[9px] md:text-[10px] text-black font-mono uppercase tracking-widest font-bold">The Future is Here</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter text-black">
              Learn AI by <br />
              Building <br className="hidden md:block"/>
              Real Projects.
            </h1>
            
            <p className="text-base md:text-xl text-black/70 max-w-lg leading-relaxed font-medium">
              Master AI tools, autonomous agents, website development, and image generation. Join our elite community of builders.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-2">
              <Link to="/register" className="bg-black text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-sm md:text-base flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 group">
                Start Building Now
                <ArrowRight size={18} className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-[40%] relative flex justify-center items-center h-[300px] sm:h-[350px] md:h-[500px]">
            {/* Glassmorphic Data Card in Hero */}
            <div className="glass-card !bg-white/30 !border-white/40 !backdrop-blur-3xl rounded-[24px] md:rounded-[32px] p-6 md:p-8 w-full max-w-sm flex flex-col gap-4 md:gap-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] animate-float">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center text-cyber-yellow">
                  <Bot size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="bg-black text-white px-3 py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                  Live System
                </div>
              </div>
              
              <div className="space-y-1 md:space-y-2">
                <div className="text-[9px] md:text-[10px] font-mono text-black/60 uppercase tracking-widest">Active Cohort</div>
                <div className="text-3xl md:text-4xl font-black text-black">100+</div>
                <div className="text-xs md:text-sm font-medium text-black/80">Projects Deployed Daily</div>
              </div>

              <div className="w-full h-1.5 md:h-2 bg-black/10 rounded-full overflow-hidden mt-1 md:mt-2">
                <div className="w-[85%] h-full bg-black rounded-full relative">
                   <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 shimmer"></div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 md:gap-3 mt-1 md:mt-2 border-t border-black/10 pt-3 md:pt-4">
                <CheckCircle2 size={16} className="text-black md:w-[18px] md:h-[18px]" />
                <span className="text-xs md:text-sm font-bold text-black">Registration Open</span>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* The Void: Features Section */}
      <section className="relative w-full bg-background pt-20 md:pt-32 pb-16 md:pb-24 px-4 md:px-12 -mt-10 md:-mt-20 z-0">
        <div className="max-w-[1280px] mx-auto space-y-10 md:space-y-16">
          <div className="text-left space-y-3 md:space-y-4 max-w-2xl">
            <span className="text-[9px] md:text-[10px] font-mono text-cyber-yellow tracking-widest uppercase bg-cyber-yellow/10 px-3 py-1 rounded-full w-fit block">Methodology</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Why AI Learners?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="glass-card p-6 md:p-10 rounded-[24px] md:rounded-[40px] flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-6 group hover:!bg-white/10">
              <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-white/5 rounded-full flex items-center justify-center text-cyber-yellow group-hover:scale-110 transition-transform duration-500 border border-white/10">
                <Terminal size={24} className="md:w-8 md:h-8" />
              </div>
              <div className="space-y-1 md:space-y-3">
                <h3 className="text-lg md:text-2xl font-bold text-white">Practical Learning</h3>
                <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">Don't just watch videos. Code, prompt, and deploy AI solutions in our cloud-integrated lab environment from day one.</p>
              </div>
            </div>
            
            <div className="glass-card p-6 md:p-10 rounded-[24px] md:rounded-[40px] flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-6 group hover:!bg-white/10">
              <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-white/5 rounded-full flex items-center justify-center text-cyber-yellow group-hover:scale-110 transition-transform duration-500 border border-white/10">
                <Box size={24} className="md:w-8 md:h-8" />
              </div>
              <div className="space-y-1 md:space-y-3">
                <h3 className="text-lg md:text-2xl font-bold text-white">Project-Based</h3>
                <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">Build a professional portfolio of real-world AI applications, from custom chatbots to automated content pipelines.</p>
              </div>
            </div>
            
            <div className="glass-card p-6 md:p-10 rounded-[24px] md:rounded-[40px] flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-6 group hover:!bg-white/10">
              <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-white/5 rounded-full flex items-center justify-center text-cyber-yellow group-hover:scale-110 transition-transform duration-500 border border-white/10">
                <Sparkles size={24} className="md:w-8 md:h-8" />
              </div>
              <div className="space-y-1 md:space-y-3">
                <h3 className="text-lg md:text-2xl font-bold text-white">Future Skills</h3>
                <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">Stay ahead of the curve. We constantly update our curriculum to cover the latest breakthroughs in LLMs and generative tech.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Bento Grid */}
      <section className="relative w-full bg-background py-16 md:py-24 px-4 md:px-12">
        <div className="max-w-[1280px] mx-auto space-y-10 md:space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
            <div className="space-y-3 md:space-y-4">
              <span className="text-[9px] md:text-[10px] font-mono text-cyber-yellow tracking-widest uppercase bg-cyber-yellow/10 px-3 py-1 rounded-full w-fit block">Curriculum</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Explore Domains</h2>
            </div>
            <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed md:max-w-md">Our curriculum transforms you from beginner to AI specialist through structured, hands-on paths.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
            <div className="md:col-span-3 glass-card p-6 md:p-10 rounded-[24px] md:rounded-[40px] relative group overflow-hidden min-h-[200px] md:min-h-[300px] flex flex-col justify-end">
              <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-20 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-110">
                <GraduationCap size={80} className="text-white md:w-[120px] md:h-[120px]" />
              </div>
              <div className="relative z-10 space-y-2 md:space-y-3">
                <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight">AI Basics</h4>
                <p className="text-on-surface-variant text-xs md:text-sm max-w-xs leading-relaxed">Foundational concepts of neural networks, machine learning, and the history of modern AI.</p>
              </div>
            </div>
            
            <div className="md:col-span-3 glass-card p-6 md:p-10 rounded-[24px] md:rounded-[40px] relative group overflow-hidden min-h-[200px] md:min-h-[300px] flex flex-col justify-end">
              <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-20 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-110">
                <Bot size={80} className="text-cyber-yellow md:w-[120px] md:h-[120px]" />
              </div>
              <div className="relative z-10 space-y-2 md:space-y-3">
                <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight">AI Agents</h4>
                <p className="text-on-surface-variant text-xs md:text-sm max-w-xs leading-relaxed">Build autonomous agents using AutoGPT, BabyAGI, and modern LLM orchestration frameworks.</p>
              </div>
            </div>
            
            <div className="md:col-span-2 glass-card p-6 md:p-10 rounded-[24px] md:rounded-[40px] text-center group flex flex-col justify-center items-center gap-4 md:gap-6 min-h-[200px] md:min-h-[250px]">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyber-yellow/20 transition-colors border border-white/10">
                <Globe className="text-white group-hover:text-cyber-yellow transition-colors w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div className="space-y-1 md:space-y-2">
                <h4 className="text-xl md:text-2xl font-bold text-white">Website Dev</h4>
                <p className="text-[9px] md:text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">Full-stack & AI</p>
              </div>
            </div>
            
            <div className="md:col-span-2 glass-card p-6 md:p-10 rounded-[24px] md:rounded-[40px] text-center group flex flex-col justify-center items-center gap-4 md:gap-6 min-h-[200px] md:min-h-[250px]">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyber-yellow/20 transition-colors border border-white/10">
                <Palette className="text-white group-hover:text-cyber-yellow transition-colors w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div className="space-y-1 md:space-y-2">
                <h4 className="text-xl md:text-2xl font-bold text-white">Image Gen</h4>
                <p className="text-[9px] md:text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">Midjourney & SD</p>
              </div>
            </div>
            
            <div className="md:col-span-2 glass-card p-6 md:p-10 rounded-[24px] md:rounded-[40px] text-center group flex flex-col justify-center items-center gap-4 md:gap-6 min-h-[200px] md:min-h-[250px]">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyber-yellow/20 transition-colors border border-white/10">
                <Music className="text-white group-hover:text-cyber-yellow transition-colors w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div className="space-y-1 md:space-y-2">
                <h4 className="text-xl md:text-2xl font-bold text-white">Music Gen</h4>
                <p className="text-[9px] md:text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">Suno & Udio AI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-16 md:py-32 px-4 md:px-12 flex justify-center">
        <div className="max-w-[1000px] w-full glass-card p-8 md:p-20 rounded-[32px] md:rounded-[60px] text-center flex flex-col items-center gap-6 md:gap-8 relative overflow-hidden border-white/20">
          <div className="absolute top-0 left-0 w-full h-full bg-cyber-yellow/5 pointer-events-none"></div>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter relative z-10 leading-tight">
            Ready to <br/> <span className="text-cyber-yellow">Innovate?</span>
          </h2>
          <p className="text-xs md:text-base text-on-surface-variant max-w-md leading-relaxed relative z-10">
            Unlock over 100+ projects, exclusive community events, and the most advanced AI curriculum available.
          </p>
          <div className="mt-2 md:mt-4 relative z-10">
            <Link to="/register" className="bg-cyber-yellow text-black px-8 py-4 md:px-12 md:py-5 rounded-full font-black text-sm md:text-lg flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(253,224,71,0.3)]">
              Join Now
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}
