// Page d'accueil époustouflante pour ALMAS & DIMAS
// Design luxueux avec animations et effets visuels impressionnants

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Diamond, 
  Star, 
  Crown, 
  Sparkles, 
  ArrowRight, 
  Play,
  Award,
  Shield,
  Truck,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const featuresY = useTransform(scrollY, [300, 800], [100, 0]);

  // Slides du carousel hero
  const heroSlides = [
    {
      id: 1,
      title: "Diamants d'Exception",
      subtitle: "Collection Éternité",
      description: "Découvrez nos diamants certifiés, taillés à la perfection pour capturer la lumière éternelle.",
      image: "/api/placeholder/1200/800",
      cta: "Explorer la Collection",
      link: "/products?category=diamonds"
    },
    {
      id: 2,
      title: "Bagues de Fiançailles",
      subtitle: "Moments Précieux",
      description: "Créez des souvenirs inoubliables avec nos bagues de fiançailles sur mesure.",
      image: "/api/placeholder/1200/800",
      cta: "Personnaliser",
      link: "/products?category=engagement-rings"
    },
    {
      id: 3,
      title: "Colliers de Luxe",
      subtitle: "Élégance Raffinée",
      description: "Sublimez votre style avec nos colliers ornés des plus beaux diamants.",
      image: "/api/placeholder/1200/800",
      cta: "Voir les Modèles",
      link: "/products?category=necklaces"
    }
  ];

  // Collections en vedette
  const featuredCollections = [
    {
      name: "Diamants Bruts",
      description: "Pureté naturelle",
      image: "/api/placeholder/400/500",
      price: "À partir de 2,500€",
      link: "/products?category=raw-diamonds"
    },
    {
      name: "Bagues Solitaires",
      description: "Élégance intemporelle",
      image: "/api/placeholder/400/500",
      price: "À partir de 1,800€",
      link: "/products?category=solitaire-rings"
    },
    {
      name: "Parures Complètes",
      description: "Harmonie parfaite",
      image: "/api/placeholder/400/500",
      price: "À partir de 5,000€",
      link: "/products?category=jewelry-sets"
    }
  ];

  // Témoignages clients
  const testimonials = [
    {
      name: "Sophie Martin",
      role: "Cliente VIP",
      content: "Un service exceptionnel et des bijoux d'une qualité incomparable. Ma bague de fiançailles est absolument magnifique !",
      rating: 5,
      image: "/api/placeholder/80/80"
    },
    {
      name: "Alexandre Dubois",
      role: "Collectionneur",
      content: "Gems Revived propose les plus beaux diamants que j'aie jamais vus. L'expertise de l'équipe est remarquable.",
      rating: 5,
      image: "/api/placeholder/80/80"
    },
    {
      name: "Marie Leroy",
      role: "Amatrice de bijoux",
      content: "Chaque pièce raconte une histoire. La personnalisation offerte dépasse toutes mes attentes.",
      rating: 5,
      image: "/api/placeholder/80/80"
    }
  ];

  // Auto-slide pour le carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Section Hero avec Carousel */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1 }}
              className="relative w-full h-full"
            >
              {/* Image de fond avec overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${heroSlides[currentSlide].image})`,
                  filter: 'brightness(0.7)'
                }}
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-purple-900/40" />
              
              {/* Particules flottantes */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/30 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [-20, -100],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              {/* Contenu du slide */}
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-3xl">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      <Badge className="mb-4 bg-yellow-600/20 text-yellow-300 border-yellow-400/30">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {heroSlides[currentSlide].subtitle}
                      </Badge>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
                    >
                      {heroSlides[currentSlide].title.split(' ').map((word, index) => (
                        <motion.span
                          key={index}
                          className={index === 1 ? "bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent" : ""}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                        >
                          {word}{' '}
                        </motion.span>
                      ))}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.8 }}
                      className="text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed"
                    >
                      {heroSlides[currentSlide].description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1, duration: 0.8 }}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-yellow-700 to-yellow-900 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg group"
                        asChild
                      >
                        <Link to={heroSlides[currentSlide].link}>
                          {heroSlides[currentSlide].cta}
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                      
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm"
                        onClick={() => setIsVideoPlaying(true)}
                      >
                        <Play className="mr-2 w-5 h-5" />
                        Voir la Vidéo
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Contrôles du carousel */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Flèches de navigation */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>

      {/* Section Avantages */}
      <motion.section
        style={{ y: featuresY }}
        className="py-20 bg-white relative overflow-hidden"
      >
        {/* Motif de fond */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border border-yellow-300 rounded-full" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-yellow-300 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-yellow-300 rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir <span className="bg-gradient-to-r from-yellow-700 to-yellow-900 bg-clip-text text-transparent">Gems Revived</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expérience d'achat exceptionnelle avec des garanties uniques dans l'univers de la joaillerie de luxe
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Certification GIA",
                description: "Tous nos diamants sont certifiés par les plus grands laboratoires mondiaux"
              },
              {
                icon: Shield,
                title: "Garantie à Vie",
                description: "Protection complète et service après-vente exceptionnel pour tous vos bijoux"
              },
              {
                icon: Truck,
                title: "Livraison Sécurisée",
                description: "Transport assuré et livraison gratuite pour toute commande supérieure à 500€"
              },
              {
                icon: Heart,
                title: "Personnalisation",
                description: "Créez des pièces uniques avec notre service de personnalisation sur mesure"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-700 to-yellow-900 rounded-2xl flex items-center justify-center"
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section Collections en Vedette */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Collections <span className="bg-gradient-to-r from-yellow-700 to-yellow-900 bg-clip-text text-transparent">Exclusives</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos créations les plus prestigieuses, alliant tradition artisanale et innovation contemporaine
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCollections.map((collection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <Link to={collection.link}>
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg group-hover:shadow-2xl transition-all duration-500">
                    <div className="aspect-[4/5] overflow-hidden">
                      <motion.img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        whileHover={{ scale: 1.1 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                        {collection.name}
                      </h3>
                      <p className="text-gray-600 mb-3">{collection.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-yellow-600">{collection.price}</span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center text-yellow-600 group-hover:text-yellow-700"
                        >
                          <span className="text-sm font-medium mr-1">Découvrir</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Badge "Nouveau" */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-yellow-600 text-white">
                        <Crown className="w-3 h-3 mr-1" />
                        Exclusif
                      </Badge>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-700 to-yellow-900 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg"
              asChild
            >
              <Link to="/products">
                Voir Toutes les Collections
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Témoignages <span className="bg-gradient-to-r from-yellow-700 to-yellow-900 bg-clip-text text-transparent">Clients</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez ce que nos clients disent de leur expérience avec Gems Revived
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA Final */}
      <section className="py-20 bg-gradient-to-r from-yellow-900 via-yellow-800 to-yellow-900 relative overflow-hidden">
        {/* Effets de fond */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Prêt à Découvrir
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                l'Exception ?
              </span>
            </h2>
            
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Rejoignez notre communauté exclusive et découvrez des bijoux qui racontent votre histoire unique
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                asChild
              >
                <Link to="/products">
                  Explorer la Collection
                  <Diamond className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm"
                asChild
              >
                <Link to="/register">
                  Créer un Compte
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal Vidéo */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full aspect-video bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Placeholder pour la vidéo */}
              <div className="w-full h-full bg-gradient-to-br from-yellow-900 to-yellow-950 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Vidéo de présentation Gems Revived</p>
                  <p className="text-sm opacity-75 mt-2">Découvrez l'art de la joaillerie de luxe</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;

