'use client';

import { User } from '@/types';
import React from 'react';

interface ListingContextType {
  listingId: string;
  imageSrc: string[];
  userId: string | null;
  members: User[];
  host: User | null;
  onRemoveMember: (userId: string) => Promise<{ data: any, error: any }>;
  onUpdateMember: (userId: string) => Promise<{ data: any, error: any }>;
}

export const ListingContext = React.createContext<ListingContextType>({
  listingId: '',
  imageSrc: [],
  userId: null,
  members: [],
  host: null,
  onRemoveMember: () => Promise.resolve({ data: null, error: null }),
  onUpdateMember: () => Promise.resolve({ data: null, error: null })
});

export default function ContextProvider({
  listingId,
  imageSrc,
  userId,
  members,
  host,
  onRemoveMember,
  onUpdateMember,
  children
}: {
  userId: string | null,
  imageSrc: string[],
  listingId: string,
  members: User[],
  host: User | null,
  onRemoveMember: (userId: string) => Promise<{ data: any, error: any }>
  onUpdateMember: (userId: string) => Promise<{ data: any, error: any }>
  children: React.ReactNode
}) {
  return (
    <ListingContext.Provider value={{ listingId, imageSrc, userId, members, host, onRemoveMember, onUpdateMember }} >
      {children}
    </ListingContext.Provider>
  );
}