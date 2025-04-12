
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Shield, 
  Sparkles, 
  Heart, 
  Clock, 
  ChevronRight, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Leaf, 
  LineChart
} from 'lucide-react';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: "Smart Coverage Analysis",
      description: "Our AI analyzes your needs and recommends personalized coverage options.",
      icon: <BarChart3 className="h-10 w-10 text-primary" />
    },
    {
      title: "Eco-Friendly Rewards",
      description: "Earn discounts through sustainable choices and eco-friendly actions.",
      icon: <Leaf className="h-10 w-10 text-green-500" />
    },
    {
      title: "Real-Time Monitoring",
      description: "Track your claims, coverage, and benefits in real-time from anywhere.",
      icon: <LineChart className="h-10 w-10 text-blue-500" />
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-[80vh] flex items-center justify-center py-16 lg:py-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-accent/10 -z-10" />
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4 mr-2" /> Smart Insurance Platform
                </span>
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                variants={itemVariants}
              >
                Navigate Your Insurance <span className="text-primary">Smarter</span>
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground"
                variants={itemVariants}
              >
                AI-powered insurance insights, personalized coverage recommendations, and eco-friendly rewards all in one platform.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                variants={itemVariants}
              >
                <Button size="lg" className="group" asChild>
                  <Link to="/register">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/compare">Compare Plans</Link>
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
                
                <motion.div 
                  className="relative bg-white dark:bg-card rounded-2xl shadow-xl p-6 border"
                  whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <Shield className="h-8 w-8 text-primary mr-3" />
                      <span className="text-xl font-bold">Policy Insights</span>
                    </div>
                    <span className="text-sm bg-green-100 text-green-800 py-1 px-3 rounded-full">Active</span>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className={`p-4 rounded-lg transition-all ${activeFeature === index ? 'bg-primary/10 ring-1 ring-primary/20' : 'bg-secondary'}`}
                        animate={activeFeature === index ? { scale: 1.02 } : { scale: 1 }}
                      >
                        <div className="flex items-center">
                          {feature.icon}
                          <div className="ml-3">
                            <h3 className="font-medium">{feature.title}</h3>
                            {activeFeature === index && (
                              <motion.p 
                                className="text-sm text-muted-foreground mt-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                              >
                                {feature.description}
                              </motion.p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Coverage Strength</p>
                      <p className="font-medium">78% Protected</p>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section
        className="py-16 bg-secondary/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container px-4 mx-auto text-center">
          <motion.h2 
            className="text-3xl font-bold mb-12"
            variants={itemVariants}
          >
            Trusted by Customers Nationwide
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "95%", label: "Customer Satisfaction", icon: <Heart className="h-8 w-8 text-red-500" /> },
              { value: "24/7", label: "Customer Support", icon: <Clock className="h-8 w-8 text-blue-500" /> },
              { value: "$2.4M", label: "Claims Processed", icon: <BarChart3 className="h-8 w-8 text-green-500" /> },
              { value: "15%", label: "Average Savings", icon: <Award className="h-8 w-8 text-yellow-500" /> }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                className="bg-background rounded-xl p-6 border shadow-sm"
                variants={statsVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Features Section */}
      <motion.section 
        className="py-16 lg:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              variants={itemVariants}
            >
              Built for the Modern Insurance Customer
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground"
              variants={itemVariants}
            >
              Our AI-powered platform combines personalized recommendations with eco-friendly incentives, giving you complete control over your insurance journey.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Recommendations",
                description: "Get personalized insurance recommendations based on your unique profile and needs.",
                icon: <Sparkles className="h-10 w-10 text-purple-500" />
              },
              {
                title: "Eco-Friendly Rewards",
                description: "Earn discounts and rewards through sustainable choices and eco-friendly lifestyle.",
                icon: <Leaf className="h-10 w-10 text-green-500" />
              },
              {
                title: "Comprehensive Coverage",
                description: "From auto to health, home to travel - we've got all your insurance needs covered.",
                icon: <Shield className="h-10 w-10 text-primary" />
              },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                className="bg-background border rounded-xl p-8 hover:shadow-md transition-all"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-6">{feature.description}</p>
                <Link 
                  to="/" 
                  className="text-primary font-medium flex items-center hover:underline"
                >
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        className="py-16 lg:py-24 bg-secondary/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              variants={itemVariants}
            >
              What Our Customers Say
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground"
              variants={itemVariants}
            >
              Join thousands of satisfied customers who have transformed their insurance experience.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "PolicyCompass helped me find the perfect insurance bundle while saving 15% on my premiums. The AI recommendations were spot on!",
                author: "Michael T.",
                role: "Home Owner",
                rating: 5
              },
              {
                quote: "The eco rewards program is amazing! I've earned significant discounts just by making small changes to my lifestyle and driving habits.",
                author: "Sarah L.",
                role: "Eco Enthusiast",
                rating: 5
              },
              {
                quote: "Filing a claim was easier than ever. The real-time tracking kept me informed throughout the entire process.",
                author: "David R.",
                role: "Business Owner",
                rating: 4
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                className="bg-background rounded-xl p-8 border relative"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-${i < testimonial.rating ? "yellow-500" : "gray-300"}`}>★</span>
                  ))}
                </div>
                <p className="italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 lg:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container px-4 mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-blue-600 text-white p-8 md:p-12 lg:p-16">
            <div className="relative z-10 max-w-3xl">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                variants={itemVariants}
              >
                Ready to reimagine your insurance experience?
              </motion.h2>
              <motion.p 
                className="text-xl opacity-90 mb-8"
                variants={itemVariants}
              >
                Join PolicyCompass today and discover how our AI-powered platform can help you find the perfect coverage while earning rewards.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/register">
                    Create Free Account
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
                  <Link to="/compare">
                    Compare Plans
                  </Link>
                </Button>
              </motion.div>
            </div>
            
            {/* Abstract shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          </div>
        </div>
      </motion.section>

      {/* Insurance Types */}
      <motion.section 
        className="py-16 lg:py-24 bg-secondary/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              variants={itemVariants}
            >
              Insurance Coverage for Every Need
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground"
              variants={itemVariants}
            >
              We offer comprehensive coverage options tailored to your unique situation.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Auto Insurance", color: "insurance-auto", icon: <Shield className="h-6 w-6" /> },
              { title: "Home Insurance", color: "insurance-home", icon: <Shield className="h-6 w-6" /> },
              { title: "Health Insurance", color: "insurance-health", icon: <Shield className="h-6 w-6" /> },
              { title: "Life Insurance", color: "insurance-life", icon: <Shield className="h-6 w-6" /> },
              { title: "Travel Insurance", color: "insurance-travel", icon: <Shield className="h-6 w-6" /> },
              { title: "Business Insurance", color: "insurance-auto", icon: <Shield className="h-6 w-6" /> },
            ].map((type, i) => (
              <motion.div 
                key={i} 
                className="group"
                variants={itemVariants}
              >
                <Link to="/policies" className="block">
                  <Card className="overflow-hidden hover:shadow-lg transition-all bg-background group-hover:-translate-y-1 duration-300">
                    <div className={`bg-${type.color} h-2`}></div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`bg-${type.color}/10 p-2 rounded-full text-${type.color} mr-4`}>
                            {type.icon}
                          </div>
                          <h3 className="font-medium text-lg">{type.title}</h3>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section 
        className="py-16 lg:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-6" variants={itemVariants}>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                <Leaf className="w-4 h-4 mr-2" /> Eco-Friendly Insurance
              </span>
              <h2 className="text-3xl font-bold">Insurance that rewards sustainable choices</h2>
              <p className="text-lg text-muted-foreground">
                Our unique eco-rewards program gives you discounts and benefits for making environmentally conscious decisions. Sustainable choices are good for the planet and your wallet.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  "Earn points for eco-friendly behaviors",
                  "Convert points to premium discounts",
                  "Track your environmental impact",
                  "Join community sustainability initiatives"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <p>{benefit}</p>
                  </div>
                ))}
              </div>
              
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <Link to="/rewards">
                  Explore Eco Rewards
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <div className="relative bg-white dark:bg-card rounded-2xl shadow-xl border p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Award className="h-6 w-6 text-green-600 mr-2" />
                  <span>Eco Rewards</span>
                </h3>
                
                <div className="space-y-6 mb-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Monthly Progress</span>
                      <span className="font-medium">420 / 500 points</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full bg-green-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: "84%" }}
                        transition={{ delay: 0.5, duration: 1 }}
                      ></motion.div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { label: "Paperless Billing", completed: true, points: "+50 pts" },
                      { label: "Electric Vehicle", completed: true, points: "+150 pts" },
                      { label: "Home Energy Audit", completed: true, points: "+120 pts" },
                      { label: "Sustainable Home Upgrades", completed: false, points: "+200 pts" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                        <div className="flex items-center">
                          <div className={`rounded-full p-1 ${item.completed ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"} mr-3`}>
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <span className={item.completed ? "" : "text-muted-foreground"}>{item.label}</span>
                        </div>
                        <span className={`font-medium ${item.completed ? "text-green-600" : "text-muted-foreground"}`}>
                          {item.points}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-100 dark:border-green-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-full text-green-600 mr-3">
                          <Leaf className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Current Discount</p>
                          <p className="text-sm text-muted-foreground">On applicable premiums</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-green-600">7%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-500/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-green-500/10 rounded-full blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
