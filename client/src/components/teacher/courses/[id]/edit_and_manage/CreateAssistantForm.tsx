"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { 
  Mail, 
  Send, 
  Shield, 
  MessageSquare,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";

interface CreateAssistantFormProps {
  onBack: () => void;
  onSuccess?: () => void;
  courseId?: string;
}

const AVAILABLE_PERMISSIONS = [
  {
    id: "GRADE_ASSIGNMENTS",
    label: "Grade Assignments",
    description: "Can grade student assignments and provide feedback"
  },
  {
    id: "VIEW_ANALYTICS",
    label: "View Analytics",
    description: "Can view course analytics and student progress"
  },
  {
    id: "MANAGE_CONTENT",
    label: "Manage Content",
    description: "Can edit lessons, quizzes, and course materials"
  },
  {
    id: "MANAGE_STUDENTS",
    label: "Manage Students",
    description: "Can view and manage student enrollments"
  },
  {
    id: "SEND_ANNOUNCEMENTS",
    label: "Send Announcements",
    description: "Can send announcements to course students"
  }
];

export default function CreateAssistantForm({ 
  onBack, 
  onSuccess,
  courseId 
}: CreateAssistantFormProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([
    "GRADE_ASSIGNMENTS",
    "VIEW_ANALYTICS"
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setErrorMessage("Email is required");
      return;
    }

    if (selectedPermissions.length === 0) {
      setErrorMessage("Please select at least one permission");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage("");

    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/assistants/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          courseId,
          permissions: selectedPermissions,
          message: message.trim() || undefined
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send invitation');
      }

      setSubmitStatus('success');
      setTimeout(() => {
        onSuccess?.();
      }, 2000);

    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPermissionBadgeColor = (permissionId: string) => {
    const colors: Record<string, string> = {
      "GRADE_ASSIGNMENTS": "bg-green-100 text-green-800",
      "VIEW_ANALYTICS": "bg-blue-100 text-blue-800",
      "MANAGE_CONTENT": "bg-purple-100 text-purple-800",
      "MANAGE_STUDENTS": "bg-orange-100 text-orange-800",
      "SEND_ANNOUNCEMENTS": "bg-pink-100 text-pink-800",
    };
    return colors[permissionId] || "bg-gray-100 text-gray-800";
  };

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Invitation Sent!</h3>
        <p className="text-muted-foreground mb-4">
          We&apos;ve sent an invitation email to <strong>{email}</strong>
        </p>
        <p className="text-sm text-muted-foreground">
          The assistant will receive a link to complete their registration and set up their account.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-medium mb-2">Invite Assistant</h3>
        <p className="text-sm text-muted-foreground">
          Send an invitation to an assistant to help manage this course
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="assistant@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Personal Message */}
        <div className="space-y-2">
          <Label htmlFor="message">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Personal Message (Optional)
            </div>
          </Label>
          <Textarea
            id="message"
            placeholder="Add a personal message to your invitation..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        {/* Permissions Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Permissions
            </CardTitle>
            <CardDescription>
              Select what this assistant can do in your course
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {AVAILABLE_PERMISSIONS.map((permission) => (
              <div key={permission.id} className="flex items-start space-x-3">
                <Button
                  type="button"
                  variant={selectedPermissions.includes(permission.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePermissionToggle(permission.id)}
                  disabled={isSubmitting}
                  className="h-6 w-6 p-0 rounded"
                >
                  {selectedPermissions.includes(permission.id) && (
                    <div className="h-3 w-3 bg-current rounded-sm" />
                  )}
                </Button>
                <div className="flex-1">
                  <Label 
                    className="text-sm font-medium cursor-pointer"
                    onClick={() => handlePermissionToggle(permission.id)}
                  >
                    {permission.label}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    {permission.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Selected Permissions Preview */}
        {selectedPermissions.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Selected Permissions:</Label>
            <div className="flex flex-wrap gap-2">
              {selectedPermissions.map((permissionId) => {
                const permission = AVAILABLE_PERMISSIONS.find(p => p.id === permissionId);
                return (
                  <Badge
                    key={permissionId}
                    variant="outline"
                    className={`text-xs ${getPermissionBadgeColor(permissionId)}`}
                  >
                    {permission?.label || permissionId}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md"
          >
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-700">{errorMessage}</span>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !email.trim()}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Invitation
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
} 