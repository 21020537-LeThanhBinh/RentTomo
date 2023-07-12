'use client';

import { User } from '@/types';
import React from 'react';

interface ListingContextType {
  userId: string | null;
  listingId: string | null;
  members: User[];
  host: User | null;
  onRemoveMember: (userId: string) => Promise<{ data: any, error: any }>;
  onUpdateMember: (userId: string) => Promise<{ data: any, error: any }>;
}

export const ListingContext = React.createContext<ListingContextType>({
  userId: null,
  listingId: null,
  members: [],
  host: null,
  onRemoveMember: () => Promise.resolve({ data: null, error: null }),
  onUpdateMember: () => Promise.resolve({ data: null, error: null })
});

export default function ContextProvider({
  userId,
  listingId,
  members,
  host,
  onRemoveMember,
  onUpdateMember,
  children
}: {
  userId: string | null,
  listingId: string | null,
  members: User[],
  host: User | null,
  onRemoveMember: (userId: string) => Promise<{ data: any, error: any }>
  onUpdateMember: (userId: string) => Promise<{ data: any, error: any }>
  children: React.ReactNode
}) {
  return (
    <ListingContext.Provider value={{ userId, listingId, members, host, onRemoveMember, onUpdateMember }} >
      {children}
    </ListingContext.Provider>
  );
}