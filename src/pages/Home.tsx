import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Box, Sparkles, GraduationCap, Bot, Globe, Palette, Music, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full flex-grow flex flex-col bg-background relative overflow-hidden">
      {/* Liquid Hero Section */}
      <section className="relative w-full bg-cyber-yellow rounded-b-[40px] md:rounded-bl-[80px] md:rounded-br-[160px] pt-12 pb-24 md:pb-40 px-4 md:px-12 flex flex-col items-center justify-center z-10 transition-all duration-700 ease-in-out">
        <div className="w-full max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="w-full md:w-[60%] flex flex-col gap-8 z-10">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 w-fit">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
              <span className="text-[10px] text-black font-mono uppercase tracking-widest font-bold">The Future is Here</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter text-black">
              Learn AI by <br />
              Building <br className="hidden md:block"/>
              Real Projects.
            </h1>
            
            <p className="text-lg md:text-xl text-black/70 max-w-lg leading-relaxed font-medium">
              Master AI tools, autonomous agents, website development, and image generation. Join our elite community of builders.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-2">
              <Link to="/register" className="bg-black text-white px-10 py-5 rounded-full font-bold flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 group">
                Start Building Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-[40%] relative flex justify-center items-center h-[400px] md:h-[500px]">
            {/* Glassmorphic Data Card in Hero */}
            <div className="glass-card !bg-white/30 !border-white/40 !backdrop-blur-3xl rounded-[32px] p-8 w-full max-w-sm flex flex-col gap-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] animate-float">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-cyber-yellow">
                  <Bot size={24} />
                </div>
                <div className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Live System
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-black/60 uppercase tracking-widest">Active Cohort</div>
                <div className="text-4xl font-black text-black">100+</div>
                <div className="text-sm font-medium text-black/80">Projects Deployed Daily</div>
              </div>

              <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden mt-2">
                <div className="w-[85%] h-full bg-black rounded-full relative">
                   <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 shimmer"></div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-2 border-t border-black/10 pt-4">
                <CheckCircle2 size={18} className="text-black" />
                <span className="text-sm font-bold text-black">Registration Open</span>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* The Void: Features Section */}
      <section className="relative w-full bg-background pt-32 pb-24 px-4 md:px-12 -mt-20 z-0">
        <div className="max-w-[1280px] mx-auto space-y-16">
          <div className="text-left space-y-4 max-w-2xl">
            <span className="text-[10px] font-mono text-cyber-yellow tracking-widest uppercase bg-cyber-yellow/10 px-3 py-1 rounded-full">Methodology</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Why AI Learners?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-10 rounded-[40px] flex flex-col gap-6 group hover:!bg-white/10">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-cyber-yellow group-hover:scale-110 transition-transform duration-500 border border-white/10">
                <Terminal size={32} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">Practical Learning</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Don't just watch videos. Code, prompt, and deploy AI solutions in our cloud-integrated lab environment from day one.</p>
              </div>
            </div>
            
            <div className="glass-card p-10 rounded-[40px] flex flex-col gap-6 group hover:!bg-white/10">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-cyber-yellow group-hover:scale-110 transition-transform duration-500 border border-white/10">
                <Box size={32} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">Project-Based</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Build a professional portfolio of real-world AI applications, from custom chatbots to automated content pipelines.</p>
              </div>
            </div>
            
            <div className="glass-card p-10 rounded-[40px] flex flex-col gap-6 group hover:!bg-white/10">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-cyber-yellow group-hover:scale-110 transition-transform duration-500 border border-white/10">
                <Sparkles size={32} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">Future Skills</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Stay ahead of the curve. We constantly update our curriculum to cover the latest breakthroughs in LLMs and generative tech.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Bento Grid */}
      <section className="relative w-full bg-background py-24 px-4 md:px-12">
        <div className="max-w-[1280px] mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-cyber-yellow tracking-widest uppercase bg-cyber-yellow/10 px-3 py-1 rounded-full">Curriculum</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Explore Domains</h2>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed md:max-w-md">Our curriculum transforms you from beginner to AI specialist through structured, hands-on paths.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <div className="md:col-span-3 glass-card p-10 rounded-[40px] relative group overflow-hidden min-h-[300px] flex flex-col justify-end">
              <div className="absolute top-10 right-10 opacity-20 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-110">
                <GraduationCap size={120} className="text-white" />
              </div>
              <div className="relative z-10 space-y-3">
                <h4 className="text-3xl font-black text-white tracking-tight">AI Basics</h4>
                <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">Foundational concepts of neural networks, machine learning, and the history of modern AI.</p>
              </div>
            </div>
            
            <div className="md:col-span-3 glass-card p-10 rounded-[40px] relative group overflow-hidden min-h-[300px] flex flex-col justify-end">
              <div className="absolute top-10 right-10 opacity-20 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-110">
                <Bot size={120} className="text-cyber-yellow" />
              </div>
              <div className="relative z-10 space-y-3">
                <h4 className="text-3xl font-black text-white tracking-tight">AI Agents</h4>
                <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">Build autonomous agents using AutoGPT, BabyAGI, and modern LLM orchestration frameworks.</p>
              </div>
            </div>
            
            <div className="md:col-span-2 glass-card p-10 rounded-[40px] text-center group flex flex-col justify-center items-center gap-6 min-h-[250px]">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyber-yellow/20 transition-colors border border-white/10">
                <Globe className="text-white group-hover:text-cyber-yellow transition-colors" size={40} />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-white">Website Dev</h4>
                <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">Full-stack & AI</p>
              </div>
            </div>
            
            <div className="md:col-span-2 glass-card p-10 rounded-[40px] text-center group flex flex-col justify-center items-center gap-6 min-h-[250px]">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyber-yellow/20 transition-colors border border-white/10">
                <Palette className="text-white group-hover:text-cyber-yellow transition-colors" size={40} />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-white">Image Gen</h4>
                <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">Midjourney & SD</p>
              </div>
            </div>
            
            <div className="md:col-span-2 glass-card p-10 rounded-[40px] text-center group flex flex-col justify-center items-center gap-6 min-h-[250px]">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyber-yellow/20 transition-colors border border-white/10">
                <Music className="text-white group-hover:text-cyber-yellow transition-colors" size={40} />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-white">Music Gen</h4>
                <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">Suno & Udio AI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-32 px-4 md:px-12 flex justify-center">
        <div className="max-w-[1000px] w-full glass-card p-12 md:p-20 rounded-[60px] text-center flex flex-col items-center gap-8 relative overflow-hidden border-white/20">
          <div className="absolute top-0 left-0 w-full h-full bg-cyber-yellow/5 pointer-events-none"></div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter relative z-10 leading-tight">
            Ready to <br/> <span className="text-cyber-yellow">Innovate?</span>
          </h2>
          <p className="text-sm md:text-base text-on-surface-variant max-w-md leading-relaxed relative z-10">
            Unlock over 100+ projects, exclusive community events, and the most advanced AI curriculum available.
          </p>
          <div className="mt-4 relative z-10">
            <Link to="/register" className="bg-cyber-yellow text-black px-12 py-5 rounded-full font-black text-lg flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(253,224,71,0.3)]">
              Join Now
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}
