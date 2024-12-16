"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"
          >
            Ovarian Tumor Detection System
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto"
          >
            Leveraging advanced AI technology to assist in early detection of
            ovarian tumors through ultrasound image analysis.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center gap-4"
          >
            <div className="w-full h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10 rounded-full" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Advanced AI Analysis",
              description:
                "State-of-the-art machine learning algorithms for accurate tumor detection",
            },
            {
              title: "Real-time Processing",
              description:
                "Instant analysis of ultrasound images with immediate results",
            },
            {
              title: "High Accuracy",
              description:
                "Proven accuracy rates in detecting various types of ovarian tumors",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
              className="p-6 rounded-lg bg-card border shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "98%", label: "Accuracy Rate" },
            { value: "< 2min", label: "Processing Time" },
            { value: "10k+", label: "Images Analyzed" },
            { value: "24/7", label: "Availability" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.8 + index * 0.2 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
