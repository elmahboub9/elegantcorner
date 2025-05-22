import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const collections = [
  {
    id: 1,
    name: 'Summer Collection',
    image: '/summer-collection.jpg',
    description: 'Light and breezy pieces for the perfect summer look',
    link: '/collections/summer'
  },
  {
    id: 2,
    name: 'Evening Wear',
    image: '/evening-wear.jpg',
    description: 'Elegant dresses and suits for special occasions',
    link: '/collections/evening'
  },
  {
    id: 3,
    name: 'Casual Chic',
    image: '/casual-chic.jpg',
    description: 'Sophisticated everyday wear for the modern woman',
    link: '/collections/casual'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function FeaturedCollections() {
  return (
    <section className="py-20 bg-cream">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-12">
            Featured Collections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <motion.div
                key={collection.id}
                variants={itemVariants}
                className="group relative overflow-hidden"
              >
                <Link href={collection.link}>
                  <div className="relative h-96">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 group-hover:bg-opacity-20" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <h3 className="text-2xl font-playfair mb-2">{collection.name}</h3>
                      <p className="text-sm opacity-90 mb-4">{collection.description}</p>
                      <span className="inline-block border-b-2 border-white pb-1 text-sm">
                        Explore Collection
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 