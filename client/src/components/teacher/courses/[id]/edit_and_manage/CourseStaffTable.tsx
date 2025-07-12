"use client";

import React from 'react';
import { useCourseStore } from '@/stores/courseStore';
import { Users, MoreHorizontal, Mail, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AssignAssistantButton from './AssignAssistantButton';

export default function CourseStaffTable() {
  const { staff, setStaff } = useCourseStore();

  const handleRemoveFromCourse = (assistantId: string) => {
    // TODO: Implement remove from course logic
    console.log('Remove assistant from course:', assistantId);
    // Update local state immediately for better UX
    setStaff(staff.filter(s => s.assistant.id !== assistantId));
  };

  const handleEditPermissions = (assistantId: string, permissions: string[]) => {
    // TODO: Implement edit permissions logic
    console.log('Edit permissions for assistant:', assistantId, permissions);
  };

  const handleViewDetails = (assistantId: string) => {
    // TODO: Implement view details logic
    console.log('View details for assistant:', assistantId);
  };

  const getPermissionBadgeColor = (permission: string) => {
    const colors: Record<string, string> = {
      "GRADE_ASSIGNMENTS": "bg-green-100 text-green-800",
      "VIEW_ANALYTICS": "bg-blue-100 text-blue-800",
      "MANAGE_CONTENT": "bg-purple-100 text-purple-800",
      "MANAGE_STUDENTS": "bg-orange-100 text-orange-800",
      "SEND_ANNOUNCEMENTS": "bg-pink-100 text-pink-800",
    };
    return colors[permission] || "bg-gray-100 text-gray-800";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">Course Assistants</h3>
          <p className="text-sm text-muted-foreground">
            Manage assistants for this course
          </p>
        </div>
        <AssignAssistantButton />
      </div>

      {staff.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
          <Users className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            No assistants assigned
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Invite assistants to help manage this course
          </p>
          <AssignAssistantButton />
        </div>
      ) : (
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Assistant</th>
                <th className="px-4 py-3 text-left font-medium">Contact</th>
                <th className="px-4 py-3 text-left font-medium">Assigned At</th>
                <th className="px-4 py-3 text-left font-medium">Permissions</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((assistant) => (
                <tr key={assistant.id} className="border-b">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={assistant.assistant.avatar || undefined} 
                          alt={assistant.assistant.name}
                        />
                        <AvatarFallback className="text-xs">
                          {getInitials(assistant.assistant.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{assistant.assistant.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {assistant.assistant.role}
                        </p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {assistant.assistant.email}
                        </span>
                      </div>
                      {assistant.assistant.phone && (
                        <div className="flex items-center gap-2 text-xs">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {assistant.assistant.phone}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(assistant.assignedAt).toLocaleDateString()}
                    </div>
                  </td>
                  
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {assistant.permissions.length > 0 ? (
                        assistant.permissions.map((permission) => (
                          <Badge
                            key={permission}
                            variant="outline"
                            className={`text-xs ${getPermissionBadgeColor(permission)}`}
                          >
                            {permission.replace(/_/g, " ")}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          No permissions
                        </span>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(assistant.assistant.id)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditPermissions(assistant.assistant.id, assistant.permissions)}>
                          Edit Permissions
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleRemoveFromCourse(assistant.assistant.id)}
                          className="text-red-600"
                        >
                          Remove from Course
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 