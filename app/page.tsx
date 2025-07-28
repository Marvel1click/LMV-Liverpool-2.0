
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from "../public/images/file.png"
import Image from 'next/image';
import Heroimg from "../public/images/homepage image.jpg"
import Aboutusimg from "../public/images/aboutus.jpg"
import Gallery1 from "../public/images/gallery1.jpg"
import Gallery2 from "../public/images/gallery2.jpg"
import Gallery3 from "../public/images/gallery3.jpg"
import Gallery4 from "../public/images/gallery4.jpg"
import Gallery5 from "../public/images/gallery5.jpg"
import Gallery6 from "../public/images/gallery6.jpg"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Cleanup effect for mobile menu
  useEffect(() => {
    return () => {
      // Ensure body scroll is restored when component unmounts
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    // Prevent body scroll when menu is open
    if (newState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    // Re-enable body scroll
    document.body.style.overflow = 'unset';
  };

  const galleryImages = [
    {src: Gallery1, alt: "Exterior Car Wash Result"},
    {src: Gallery2, alt: "Paint Correction"},
    {src: Gallery3, alt: "Interior Detailing Transformation"},
    {src: Gallery4, alt: "Premium Car Cleaning"},
    {src: Gallery5, alt: "Quality and Convience"},
    {src: Gallery6, alt: "Mobile Valeting Service"},
  ]

  const services = [
    {
      icon: 'ri-car-washing-line',
      title: 'Exterior Wash',
      description: 'Professional exterior cleaning with premium products',
      price: 'From £25'
    },
    {
      icon: 'ri-dashboard-line',
      title: 'Interior Detail',
      description: 'Deep interior cleaning and protection',
      price: 'From £35'
    },
    {
      icon: 'ri-shield-star-line',
      title: 'Full Valet',
      description: 'Complete interior and exterior detailing',
      price: 'From £60'
    },
    {
      icon: 'ri-palette-line',
      title: 'Paint Correction',
      description: 'Professional paint restoration and protection',
      price: 'From £120'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      text: 'Absolutely brilliant service! My car looks brand new. The attention to detail is incredible.',
      location: 'Liverpool City Centre'
    },
    {
      name: 'Mike Thompson',
      rating: 5,
      text: 'Best valeting service in Liverpool. Professional, reliable and great value for money.',
      location: 'Woolton'
    },
    {
      name: 'Emma Davis',
      rating: 5,
      text: 'Outstanding work on my BMW. The paint correction was perfect. Highly recommend!',
      location: 'Southport'
    }
  ];

  const handleBookingClick = () => {
    window.location.href = 'tel:07956494838';
  };

  const handleViewGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMobileMenu();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image src={Logo} className="h-10" alt="LMV Logo" height={80} width={80} />
          </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer">Home</Link>
              <Link href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="text-white hover:text-yellow-400 transition-colors cursor-pointer">Services</Link>
              <Link href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-white hover:text-yellow-400 transition-colors cursor-pointer">About</Link>
              <Link href="#gallery" onClick={(e) => handleSmoothScroll(e, 'gallery')} className="text-white hover:text-yellow-400 transition-colors cursor-pointer">Gallery</Link>
              <Link href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-white hover:text-yellow-400 transition-colors cursor-pointer">Contact</Link>
              <button onClick={handleBookingClick} className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2 rounded-full font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer">
                Book Now
              </button>
            </div>

            <button onClick={toggleMobileMenu} className="md:hidden text-white relative z-50">
              <i className="ri-menu-line text-2xl transition-all duration-300"></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-md transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible z-[9999]' : 'opacity-0 invisible z-[-1]'}`} style={{ top: 0, left: 0, right: 0, bottom: 0, position: 'fixed' }}>
          {/* Close button */}
          <div className="absolute top-4 right-4 z-[10000]">
            <button onClick={closeMobileMenu} className="text-white hover:text-yellow-400 transition-colors p-3 bg-gray-800/50 rounded-full backdrop-blur-sm">
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>
          
          {/* Logo at top */}
          <div className="absolute top-4 left-4 z-[10000]">
            <Link href="/" onClick={closeMobileMenu} className="flex items-center space-x-2 bg-gray-800/50 rounded-full p-2 backdrop-blur-sm">
              <Image src={Logo} className="h-8" alt="LMV Logo" height={60} width={60} />
            </Link>
          </div>

          {/* Menu content */}
          <div className="flex flex-col items-center justify-center h-screen w-full space-y-6 text-center px-6 overflow-hidden">
            <Link href="/" onClick={closeMobileMenu} className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer text-xl font-semibold py-2">
              Home
            </Link>
            <Link href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="text-white hover:text-yellow-400 transition-colors cursor-pointer text-xl font-semibold py-2">
              Services
            </Link>
            <Link href="#gallery" onClick={(e) => handleSmoothScroll(e, 'gallery')} className="text-white hover:text-yellow-400 transition-colors cursor-pointer text-xl font-semibold py-2">
              Gallery
            </Link>
            <Link href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-white hover:text-yellow-400 transition-colors cursor-pointer text-xl font-semibold py-2">
              About
            </Link>
            <Link href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-white hover:text-yellow-400 transition-colors cursor-pointer text-xl font-semibold py-2">
              Contact
            </Link>
            <button onClick={() => { handleBookingClick(); closeMobileMenu(); }} className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer mt-6">
              Book Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image 
            src={Heroimg}
            alt="Professional Car Valeting"
            className="w-full h-full object-cover object-top"
            height={600}
            width={400}
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="text-white">Premium Car</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Valeting Service
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Professional mobile valeting across Liverpool. We bring luxury car care directly to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleBookingClick} className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer">
              <i className="ri-phone-line mr-2"></i>
              Book Your Service
            </button>
            <button onClick={handleViewGallery} className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 hover:text-black transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer">
              <i className="ri-play-circle-line mr-2"></i>
              View Gallery
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i className="ri-arrow-down-line text-2xl text-yellow-400"></i>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Our </span>
              <span className="text-yellow-400">Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Professional car valeting services tailored to your vehicle's needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-700 cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <i className={`${service.icon} text-2xl text-black`}></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">{service.title}</h3>
                <p className="text-gray-400 text-center mb-6">{service.description}</p>
                <div className="text-center">
                  <span className="text-yellow-400 font-bold text-lg">{service.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Our </span>
              <span className="text-yellow-400">Work</span>
            </h2>
            <p className="text-gray-400 text-lg">See the transformation of vehicles we've detailed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className='relative group overflow-hidden rounded-2xl cursor-pointer'>
                <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                className='w-full h-64 object-cover object-center transform group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                  <i className='ri-zoom-in-line text-4xl text-yellow-400'></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-white">Why Choose </span>
                <span className="text-yellow-400">LMV?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                With over 28 years of experience in professional car valeting, LMV Auto Detailing Liverpool provides premium mobile services across the city. We use only the finest products and techniques to ensure your vehicle receives the care it deserves.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-shield-check-line text-xl text-black"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">Fully Insured & Licensed</h3>
                    <p className="text-gray-400">Complete peace of mind with comprehensive insurance coverage</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-star-line text-xl text-black"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">Premium Products Only</h3>
                    <p className="text-gray-400">Professional grade products for superior results</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-time-line text-xl text-black"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">Flexible Scheduling</h3>
                    <p className="text-gray-400">Book at your convenience, 6 days a week</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image 
                src={Aboutusimg}
                alt="Professional Car Detailing"
                className="rounded-2xl shadow-2xl object-cover object-top w-full h-97"
                height={600}
                width={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">What Our </span>
              <span className="text-yellow-400">Customers Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-yellow-400 text-xl"></i>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">{testimonial.text}</p>
                <div>
                  <div className="text-white font-bold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Get In </span>
              <span className="text-yellow-400">Touch</span>
            </h2>
            <p className="text-gray-400 text-lg">Ready to give your car the premium treatment it deserves?</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <i className="ri-phone-line text-xl text-black"></i>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Call Us</div>
                  <div className="text-gray-400">
                    <Link href="tel:07956494838" className="hover:text-yellow-400 transition-colors">+44 7956 494 838</Link>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <i className="ri-mail-line text-xl text-black"></i>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Email</div>
                  <div className="text-gray-400">
                    <Link href="mailto:wardxxx@aol.com" className="hover:text-yellow-400 transition-colors">wardxxx@aol.com</Link>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <i className="ri-map-pin-line text-xl text-black"></i>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Service Areas</div>
                  <div className="text-gray-400">Liverpool & Surrounding Areas</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <form className="space-y-6">
                <div>
                  <input 
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input 
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input 
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Tell us about your vehicle and service requirements"
                    rows={4}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg font-bold hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer">
                  <i className="ri-send-plane-line mr-2"></i>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image src={Logo} className="h-10" alt="LMV Logo" height={80} width={80} />
          </Link>
              </div>
              <p className="text-gray-400 mb-6">
                Premium car valeting services across Liverpool. Professional, reliable, and convenient mobile detailing at your doorstep.
              </p>
              <div className="flex space-x-4">
                <Link href="https://www.instagram.com/liverpoolmobilevaleting?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors cursor-pointer">
                  <i className="ri-instagram-line text-white hover:text-black"></i>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-yellow-400 transition-colors cursor-pointer">Exterior Wash</li>
                <li className="hover:text-yellow-400 transition-colors cursor-pointer">Interior Detail</li>
                <li className="hover:text-yellow-400 transition-colors cursor-pointer">Full Valet</li>
                <li className="hover:text-yellow-400 transition-colors cursor-pointer">Paint Correction</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="tel:07956494838" className="hover:text-yellow-400 transition-colors">+44 7956 494 838</Link>
                </li>
                <li>
                  <Link href="mailto:wardxxx@aol.com" className="hover:text-yellow-400 transition-colors">wardxxx@aol.com</Link>
                </li>
                <li>Liverpool, UK</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 LMV Liverpool Mobile Valeting. All rights reserved.</p>
            <p>Made by <span className='text-yellow-500 hover:text-yellow-400 transition-colors duration-300 cursor-pointer'>Digital Marvels</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
