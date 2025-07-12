"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CreateAssistantForm from "./CreateAssistantForm";

export default function AssignAssistantButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'create'>('list');

  const handleOpen = () => {
    setIsOpen(true);
    setCurrentView('list');
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentView('list');
  };

  const handleCreateNew = () => {
    setCurrentView('create');
  };

  const handleBackToList = () => {
    setCurrentView('list');
  };

  const handleInviteSuccess = () => {
    // TODO: Refresh the assistants list in parent component
    console.log('Invitation sent successfully');
    setCurrentView('list');
    // Could emit an event or use a callback to refresh parent
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <UserPlus className="h-4 w-4" />
        Assign New
      </Button>

      {/* Custom Full-Screen Overlay with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 200,
              duration: 0.3
            }}
            className="fixed inset-0 z-50 bg-background"
          >
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex items-center justify-between border-b px-6 py-4"
            >
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
                <div>
                  <h2 className="text-lg font-semibold">
                    {currentView === 'list' ? 'Assign Assistants' : 'Create New Assistant'}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {currentView === 'list' 
                      ? 'Select assistants to assign to this course' 
                      : 'Create a new assistant for this course'
                    }
                  </p>
                </div>
              </div>
              {currentView === 'create' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToList}
                >
                  Back to List
                </Button>
              )}
            </motion.div>

            {/* Content */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex-1 overflow-auto p-6"
            >
              <AnimatePresence mode="wait">
                {currentView === 'list' ? (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Available Assistants</h3>
                      <Button
                        onClick={handleCreateNew}
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <UserPlus className="h-4 w-4" />
                        Create New
                      </Button>
                    </div>
                    
                    {/* TODO: Add AssistantTable here for full assistant list */}
                    <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
                      <UserPlus className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mt-4 text-lg font-medium text-muted-foreground">
                        Full Assistant List
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        This will show all available assistants to assign to the course.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="create"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <CreateAssistantForm
                      onBack={handleBackToList}
                      onSuccess={handleInviteSuccess}
                      courseId="current-course-id" // TODO: Get from route params
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 