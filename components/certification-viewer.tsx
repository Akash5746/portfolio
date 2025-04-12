"use client";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CertificationViewerProps {
  isOpen: boolean;
  onClose: () => void;
  certification: {
    title: string;
    image?: string;
    description?: string;
    issuer?: string;
    date?: string;
    url?: string;
  };
}

export default function CertificationViewer({
  isOpen,
  onClose,
  certification,
}: CertificationViewerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 right-4 z-50 w-80 md:w-96 bg-background border rounded-lg shadow-lg overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium truncate">{certification.title}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4">
            {certification.image && (
              <div className="mb-4 bg-muted rounded-md overflow-hidden">
                <img
                  src={certification.image || "/placeholder.svg"}
                  alt={certification.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {certification.description && (
              <p className="text-sm text-muted-foreground mb-4">
                {certification.description}
              </p>
            )}

            <div className="space-y-2 text-sm">
              {certification.issuer && (
                <div className="flex justify-between">
                  <span className="font-medium">Issuer:</span>
                  <span>{certification.issuer}</span>
                </div>
              )}

              {certification.date && (
                <div className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span>{certification.date}</span>
                </div>
              )}
            </div>

            {certification.url && (
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full">
                  <a
                    href={certification.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Certificate
                  </a>
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
