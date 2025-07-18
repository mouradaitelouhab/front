// Page de détail produit pour ALMAS & DIMAS
// Affichage complet d'un produit avec galerie, spécifications et fonctionnalités d'achat

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Diamond, 
  Star, 
  Heart, 
  ShoppingBag, 
  Shield, 
  Truck, 
  RotateCcw,
  Award,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Share2,
  MessageCircle,
  ArrowLeft,
  Sparkles,
  Crown,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '../utils/formatPrice';
import { productService } from '../services/productService';
import { useCart } from '../contexts/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Charger le produit
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productData = await productService.getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Erreur lors du chargement du produit:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  // Gestion de l'ajout au panier
  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity,
        size: selectedSize
      });
      
      // Animation de succès ou notification
      console.log('Produit ajouté au panier avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
    }
  };

  // Navigation dans la galerie d'images
  const nextImage = () => {
    if (product && product.images) {
      setSelectedImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product && product.images) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center elegant-gradient">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16"
        >
          <Diamond className="w-full h-full text-primary" />
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center elegant-gradient">
        <div className="text-center">
          <Diamond className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Produit non trouvé</h1>
          <p className="text-muted-foreground mb-6">Le produit que vous recherchez n'existe pas.</p>
          <Button onClick={() => navigate('/products')} className="gold-gradient">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux produits
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen elegant-gradient pt-32">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-muted-foreground mb-8"
        >
          <button 
            onClick={() => navigate('/')}
            className="hover:text-primary transition-colors"
          >
            Accueil
          </button>
          <span>/</span>
          <button 
            onClick={() => navigate('/products')}
            className="hover:text-primary transition-colors"
          >
            Produits
          </button>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Galerie d'images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Image principale */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden elegant-shadow group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIndex}
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              
              {/* Navigation des images */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {product.tags?.includes('bestseller') && (
                  <Badge className="bg-primary text-primary-foreground">
                    <Crown className="w-3 h-3 mr-1" />
                    Bestseller
                  </Badge>
                )}
                {product.originalPrice > product.price && (
                  <Badge variant="destructive">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </Badge>
                )}
              </div>

              {/* Actions rapides */}
              <div className="absolute top-4 right-4 space-y-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
                    isWishlisted 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Miniatures */}
            {product.images.length > 1 && (
              <div className="flex space-x-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-primary shadow-lg' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Informations produit */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* En-tête */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              
              {/* Évaluation */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.rating} ({product.reviewCount} avis)
                  </span>
                </div>
              </div>

              {/* Prix */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <div className="text-muted-foreground">
                <p className={showFullDescription ? '' : 'line-clamp-3'}>
                  {product.description}
                </p>
                {product.description.length > 150 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-primary hover:underline mt-2"
                  >
                    {showFullDescription ? 'Voir moins' : 'Voir plus'}
                  </button>
                )}
              </div>
            </div>

            {/* Spécifications */}
            {product.specifications && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Spécifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <span className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sélection quantité */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quantité</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stockQuantity} en stock
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                className="w-full gold-gradient text-lg py-6 hover-lift"
                disabled={!product.inStock}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {product.inStock ? 'Ajouter au Panier' : 'Rupture de Stock'}
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="hover-lift">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contacter
                </Button>
                <Button variant="outline" className="hover-lift">
                  <Heart className="w-4 h-4 mr-2" />
                  Favoris
                </Button>
              </div>
            </div>

            {/* Garanties */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-lg font-semibold">Nos Garanties</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm">Garantie à vie</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="text-sm">Livraison gratuite</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="w-5 h-5 text-primary" />
                  <span className="text-sm">Retour 30 jours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-sm">Certification GIA</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

