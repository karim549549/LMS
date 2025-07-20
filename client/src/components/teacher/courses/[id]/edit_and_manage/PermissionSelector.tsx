import React from 'react';
import { Switch } from '@/components/ui/switch';
import { AVAILABLE_PERMISSIONS, PERMISSION_COLORS } from '@/lib/constants';

interface PermissionSelectorProps {
  selectedPermissions: string[];
  onToggle: (permissionId: string) => void;
  disabled?: boolean;
}

export default function PermissionSelector({ selectedPermissions, onToggle, disabled }: PermissionSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {AVAILABLE_PERMISSIONS.map((permission) => (
        <div key={permission.id} className="flex flex-row items-center justify-between border rounded-lg p-3">
          <div className="flex flex-col">
            <span className={`font-medium p-2 text-xs  w-fit ${PERMISSION_COLORS[permission.id]}`}>{permission.label}</span>
            <span className="text-xs text-muted-foreground mt-1">{permission.description}</span>
          </div>
          <Switch
            checked={selectedPermissions.includes(permission.id)}
            onCheckedChange={() => onToggle(permission.id)}
            disabled={disabled}
            className='cursor-pointer'
          />
        </div>
      ))}
    </div>
  );
} 