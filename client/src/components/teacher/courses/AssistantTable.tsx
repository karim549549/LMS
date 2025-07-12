"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Calendar,
  BookOpen,
  Shield
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CourseAssistantView } from "@/types/course/CourseEditManageView";

interface AssistantTableProps {
  assistants: CourseAssistantView[];
  onAssignToCourse?: (assistantId: string) => void;
  onRemoveFromCourse?: (assistantId: string) => void;
  onEditPermissions?: (assistantId: string, permissions: string[]) => void;
  onViewDetails?: (assistantId: string) => void;
  showCourseContext?: boolean;
}

export default function AssistantTable({
  assistants,
  onAssignToCourse,
  onRemoveFromCourse,
  onEditPermissions,
  onViewDetails,
  showCourseContext = false
}: AssistantTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");

  const filteredAssistants = assistants.filter((assistant) => {
    const matchesSearch = 
      assistant.assistant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assistant.assistant.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === "all" || assistant.assistant.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search assistants by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">All Roles</option>
            <option value="ASSISTANT">Assistants</option>
            <option value="TEACHER">Teachers</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assistant</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Role</TableHead>
              {showCourseContext && <TableHead>Assigned At</TableHead>}
              <TableHead>Permissions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssistants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={showCourseContext ? 6 : 5} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <Shield className="h-8 w-8 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">
                      {searchTerm || filterRole !== "all" 
                        ? "No assistants match your search criteria"
                        : "No assistants found"
                      }
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredAssistants.map((assistant) => (
                <TableRow key={assistant.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage 
                          src={assistant.assistant.avatar || undefined} 
                          alt={assistant.assistant.name}
                        />
                        <AvatarFallback>
                          {getInitials(assistant.assistant.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{assistant.assistant.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {assistant.assistant.grade || "No grade specified"}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {assistant.assistant.email}
                        </span>
                      </div>
                      {assistant.assistant.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {assistant.assistant.phone}
                          </span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="secondary">
                      {assistant.assistant.role}
                    </Badge>
                  </TableCell>
                  
                  {showCourseContext && (
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(assistant.assignedAt)}
                      </div>
                    </TableCell>
                  )}
                  
                  <TableCell>
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
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onViewDetails && (
                          <DropdownMenuItem onClick={() => onViewDetails(assistant.assistant.id)}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                        )}
                        {onEditPermissions && (
                          <DropdownMenuItem onClick={() => onEditPermissions(assistant.assistant.id, assistant.permissions)}>
                            <Shield className="mr-2 h-4 w-4" />
                            Edit Permissions
                          </DropdownMenuItem>
                        )}
                        {onAssignToCourse && !showCourseContext && (
                          <DropdownMenuItem onClick={() => onAssignToCourse(assistant.assistant.id)}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            Assign to Course
                          </DropdownMenuItem>
                        )}
                        {onRemoveFromCourse && showCourseContext && (
                          <DropdownMenuItem 
                            onClick={() => onRemoveFromCourse(assistant.assistant.id)}
                            className="text-red-600"
                          >
                            <BookOpen className="mr-2 h-4 w-4" />
                            Remove from Course
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {filteredAssistants.length} of {assistants.length} assistants
        </span>
        {searchTerm && (
          <span>
            Filtered by: &quot;{searchTerm}&quot;
          </span>
        )}
      </div>
    </div>
  );
} 