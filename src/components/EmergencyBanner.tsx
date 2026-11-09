import React from 'react';
import { BrandBanner } from './BrandBanner';

interface EmergencyBannerProps {
  onOpenEmergencyBooking?: () => void;
}

/**
 * Replaced plumbing-specific banner with the unified Mighty Brands banner.
 */
export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ onOpenEmergencyBooking }) => {
  return (
    <BrandBanner
      onOpenBooking={() => {
        if (onOpenEmergencyBooking) onOpenEmergencyBooking();
      }}
    />
  );
};
